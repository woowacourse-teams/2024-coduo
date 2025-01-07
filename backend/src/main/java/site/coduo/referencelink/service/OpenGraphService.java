package site.coduo.referencelink.service;

import java.net.URL;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;

@Transactional
@RequiredArgsConstructor
@Service
public class OpenGraphService {

    private final OpenGraphRepository openGraphRepository;
    private final HtmlParser htmlParser;

    public OpenGraph createOpenGraph(final ReferenceLinkEntity referenceLinkEntity, final URL url) {
        final OpenGraph openGraph = htmlParser.getOpenGraph(url);
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        return openGraphRepository.save(openGraphEntity)
                .toDomain();
    }

    @Transactional(readOnly = true)
    public OpenGraph findOpenGraph(final Long id) {
        final Optional<OpenGraphEntity> openGraphEntity = openGraphRepository.findByReferenceLinkEntityId(id);
        if (openGraphEntity.isPresent()) {
            return openGraphEntity.get().toDomain();
        }
        return new OpenGraph();
    }

    public void deleteByReferenceLink(final ReferenceLinkEntity referenceLinkEntity) {
        openGraphRepository.deleteByReferenceLinkEntity(referenceLinkEntity);
    }
}
