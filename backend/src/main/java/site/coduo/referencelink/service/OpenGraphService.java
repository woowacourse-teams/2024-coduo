package site.coduo.referencelink.service;

import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.Url;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class OpenGraphService {

    private final OpenGraphRepository openGraphRepository;

    @Transactional
    public void createOpenGraphCommand(final ReferenceLinkEntity referenceLinkEntity) {
        final Document document = new Url(referenceLinkEntity.getUrl()).getDocument();
        final OpenGraph openGraph = OpenGraph.from(document);
        if (openGraph == null) {
            return;
        }
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph, referenceLinkEntity);
        openGraphRepository.save(openGraphEntity);
    }

    public OpenGraph findOpenGraphQuery(final Long id) {
        return openGraphRepository.findById(id)
                .map(OpenGraphEntity::toDomain)
                .orElse(null);
    }

    @Transactional
    public void deleteByReferenceLinkIdCommand(final long referenceLinkEntityId) {
        openGraphRepository.deleteByReferenceLinkEntityId(referenceLinkEntityId);
    }
}
