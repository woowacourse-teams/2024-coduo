package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.domain.Url;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphEntity;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Transactional
@RequiredArgsConstructor
@Service
public class ReferenceLinkService {

    private final ReferenceLinkRepository referenceLinkRepository;
    private final PairRoomRepository pairRoomRepository;
    private final CategoryRepository categoryRepository;
    private final OpenGraphService openGraphService;

    public ReferenceLinkResponse createReferenceLink(final String accessCodeText,
                                                     final ReferenceLinkCreateRequest request) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(accessCode);
        final ReferenceLink referenceLink = new ReferenceLink(new Url(request.url()), accessCode);

        final ReferenceLinkEntity referenceLinkEntity = saveReferenceLink(request, pairRoom, referenceLink);
        final OpenGraphEntity openGraphEntity = openGraphService.createOpenGraph(referenceLinkEntity);
        return new ReferenceLinkResponse(referenceLinkEntity, openGraphEntity.toDomain());
    }

    public ReferenceLinkEntity saveReferenceLink(final ReferenceLinkCreateRequest request,
                                                 final PairRoom pairRoom,
                                                 final ReferenceLink referenceLink
    ) {
        if (request.categoryName() == null) {
            return referenceLinkRepository.save(new ReferenceLinkEntity(referenceLink, pairRoom));
        }
        final CategoryEntity categoryEntity = categoryRepository.fetchByPairRoomAndCategoryName(
                pairRoom, request.categoryName());
        return referenceLinkRepository.save(new ReferenceLinkEntity(referenceLink, categoryEntity, pairRoom));
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkResponse> readAllReferenceLink(final String accessCodeText) {
        final List<ReferenceLinkEntity> referenceLinkEntities = referenceLinkRepository.findAll()
                .stream()
                .filter(link -> link.isSameAccessCode(new AccessCode(accessCodeText)))
                .toList();

        return referenceLinkEntities.stream()
                .map(this::makeReferenceLinkResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkResponse> findReferenceLinksByCategory(
            final String accessCodeText,
            final String categoryName
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final Category category = new Category(categoryName);

        return referenceLinkRepository.findAll()
                .stream()
                .filter(link -> link.isSameAccessCode(accessCode))
                .filter(link -> link.isSameCategory(category))
                .map(this::makeReferenceLinkResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkEntity> findReferenceLinksEntityByCategory(
            final String accessCodeText,
            final String categoryName
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final Category category = new Category(categoryName);

        return referenceLinkRepository.findAll()
                .stream()
                .filter(link -> link.isSameAccessCode(accessCode))
                .filter(link -> link.isSameCategory(category))
                .toList();
    }

    private ReferenceLinkResponse makeReferenceLinkResponse(final ReferenceLinkEntity referenceLinkEntity) {
        final OpenGraph openGraph = openGraphService.findOpenGraph(referenceLinkEntity.getId());
        return new ReferenceLinkResponse(referenceLinkEntity, openGraph);
    }

    public void deleteReferenceLink(final long id) {
        openGraphService.deleteByReferenceLinkId(id);
        referenceLinkRepository.deleteById(id);
    }
}
