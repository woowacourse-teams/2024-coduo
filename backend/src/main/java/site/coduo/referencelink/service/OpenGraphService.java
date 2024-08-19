package site.coduo.referencelink.service;

import java.io.IOException;
import java.net.URL;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.exception.DocumentAccessException;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;

@Transactional
@RequiredArgsConstructor
@Service
public class OpenGraphService {

    private final OpenGraphRepository openGraphRepository;

    public OpenGraph createOpenGraph(final ReferenceLinkEntity referenceLinkEntity, final URL url) {
        final OpenGraph openGraph = getOpenGraph(url);
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        return openGraphRepository.save(openGraphEntity)
                .toDomain();
    }

    private OpenGraph getOpenGraph(final URL url) {
        try {
            final Document document = getDocumentFromUrl(url);
            return getOpenGraphFromDocument(document, url);
        } catch (final DocumentAccessException e) {
            return OpenGraph.from(url);
        }
    }

    private Document getDocumentFromUrl(final URL url) {
        try {
            return Jsoup.connect(url.toExternalForm()).get();
        } catch (final IOException e) {
            throw new DocumentAccessException("URL에 대한 Document를 불러올 수 없습니다.");
        }
    }

    private OpenGraph getOpenGraphFromDocument(final Document document, final URL url) {
        if (hasNoTitle(document)) {
            return OpenGraph.of(document, url);
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
