package site.coduo.referencelink.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class OpenGraphService {

    private final OpenGraphRepository openGraphRepository;

    @Transactional
    public void createOpenGraphCommand(ReferenceLinkCreateRequest request) {
        final OpenGraph openGraph = OpenGraph.from(request.url());
        if (openGraph == null) {
            return;
        }
        final OpenGraphEntity openGraphEntity = new OpenGraphEntity(openGraph);
        openGraphRepository.save(openGraphEntity);
    }

    public OpenGraph findOpenGraphQuery(final Long id) {
        return openGraphRepository.findById(id)
                .map(OpenGraphEntity::toDomain)
                .orElse(null);
    }

    @Transactional
    public void deleteByReferenceLinkIdCommand(final long id) {
        openGraphRepository.deleteByReferenceLinkEntityId(id);
    }
}
