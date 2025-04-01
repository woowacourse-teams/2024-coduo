package site.coduo.referencelink.service;

import java.net.URL;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.repository.PairRoomEntity;
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

    public OpenGraphEntity createHeadTitle(final ReferenceLinkEntity referenceLinkEntity, final URL url) {
        final OpenGraph openGraph = OpenGraph.from(url);
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        return openGraphRepository.save(openGraphEntity);
    }

    public void crawlOpenGraph(final URL url, final long openGraphId) {
        final OpenGraph openGraph = htmlParser.getOpenGraph(url);
        final OpenGraphEntity openGraphEntity = openGraphRepository.fetchById(openGraphId);
        openGraphEntity.applyCrawledElements(openGraph);
    }

    @Transactional(readOnly = true)
    public OpenGraph findOpenGraph(final Long id) {
        final Optional<OpenGraphEntity> openGraphEntity = openGraphRepository.findByReferenceLinkEntityId(id);
        if (openGraphEntity.isPresent()) {
            return openGraphEntity.get().toDomain();
        }
        return new OpenGraph();
    }

    @Transactional(readOnly = true)
    public List<OpenGraphEntity> findAllByPairRoomEntity(final PairRoomEntity pairRoomEntity) {
        return openGraphRepository.findAllByPairRoomEntity(pairRoomEntity);
    }

    public void deleteByReferenceLink(final ReferenceLinkEntity referenceLinkEntity) {
        openGraphRepository.deleteByReferenceLinkEntity(referenceLinkEntity);
    }
}
