package site.coduo.referencelink.service;

import java.util.Optional;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.Url;
import site.coduo.referencelink.exception.DocumentAccessException;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;

@Transactional
@RequiredArgsConstructor
@Service
public class OpenGraphService {

    private final OpenGraphRepository openGraphRepository;

    public OpenGraphEntity createOpenGraph(final ReferenceLinkEntity referenceLinkEntity) {
        final OpenGraph openGraph = getOpenGraph(referenceLinkEntity);
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        return openGraphRepository.save(openGraphEntity);
    }

    private OpenGraph getOpenGraph(final ReferenceLinkEntity referenceLinkEntity) {
        final Url url = new Url(referenceLinkEntity.getUrl());
        try {
            final Document document = url.getDocument();
            return getOpenGraphFromDocument(document, url);
        } catch (final DocumentAccessException e) {
            return OpenGraph.from(url.extractDomain());
        }
    }

    private OpenGraph getOpenGraphFromDocument(final Document document, final Url url) {
        if (hasNoTitle(document)) {
            return OpenGraph.of(document, url.extractDomain());
        }
        return OpenGraph.from(document);
    }

    private boolean hasNoTitle(final Document document) {
        final Element element = document.selectFirst(String.format(OpenGraph.OPEN_GRAPH_META_TAG_SELECTOR, "title"));
        return document.title().isEmpty() && element == null;
    }

    @Transactional(readOnly = true)
    public OpenGraph findOpenGraph(final Long id) {
        final Optional<OpenGraphEntity> openGraphEntity = openGraphRepository.findByReferenceLinkEntityId(id);
        if (openGraphEntity.isPresent()) {
            return openGraphEntity.get().toDomain();
        }
        return new OpenGraph();
    }

    public void deleteByReferenceLinkId(final long referenceLinkEntityId) {
        openGraphRepository.deleteByReferenceLinkEntityId(referenceLinkEntityId);
    }
}
