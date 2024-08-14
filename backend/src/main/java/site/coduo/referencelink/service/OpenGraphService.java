package site.coduo.referencelink.service;

import java.util.Optional;

import org.jsoup.nodes.Document;
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

    public void createOpenGraphCommand(final ReferenceLinkEntity referenceLinkEntity) {
        final OpenGraph openGraph = getOpenGraph(referenceLinkEntity);
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        openGraphRepository.save(openGraphEntity);
    }

    private OpenGraph getOpenGraph(final ReferenceLinkEntity referenceLinkEntity) {
        try {
            final Document document = new Url(referenceLinkEntity.getUrl()).getDocument();
            return OpenGraph.from(document);
        } catch (final DocumentAccessException e) {
            return new OpenGraph();
        }
    }

    @Transactional(readOnly = true)
    public OpenGraph findOpenGraphQuery(final Long id) {
        final Optional<OpenGraphEntity> openGraphEntity = openGraphRepository.findByReferenceLinkEntityId(id);
        if (openGraphEntity.isPresent()) {
            return openGraphEntity.get().toDomain();
        }

        return new OpenGraph();
    }

    public void deleteByReferenceLinkIdCommand(final long referenceLinkEntityId) {
        openGraphRepository.deleteByReferenceLinkEntityId(referenceLinkEntityId);
    }
}
