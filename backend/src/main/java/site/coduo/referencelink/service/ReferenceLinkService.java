package site.coduo.referencelink.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.OperateNotAllowedException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.InvalidUrlFormatException;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Slf4j
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
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        validateOperationAllow(pairRoomEntity.toDomain());
        final URL url = makeUrl(request.url());
        final ReferenceLink referenceLink = new ReferenceLink(url, accessCode);

        final ReferenceLinkEntity referenceLinkEntity = saveReferenceLink(request, pairRoomEntity, referenceLink);
        final OpenGraph openGraph = openGraphService.createOpenGraph(referenceLinkEntity, url);
        return new ReferenceLinkResponse(referenceLinkEntity, openGraph);
    }

    private URL makeUrl(final String requestUrl) {
        try {
            return new URL(requestUrl);
        } catch (final MalformedURLException e) {
            throw new InvalidUrlFormatException("링크 형식이 맞지 않습니다.");
        }
    }

    private ReferenceLinkEntity saveReferenceLink(final ReferenceLinkCreateRequest request,
                                                  final PairRoomEntity pairRoomEntity,
                                                  final ReferenceLink referenceLink
    ) {
        if (request.categoryId() == null) {
            return referenceLinkRepository.save(new ReferenceLinkEntity(referenceLink, pairRoomEntity));
        }
        final CategoryEntity categoryEntity = categoryRepository.fetchByPairRoomAndCategoryId(
                pairRoomEntity, request.categoryId());
        return referenceLinkRepository.save(new ReferenceLinkEntity(referenceLink, categoryEntity, pairRoomEntity));
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkResponse> readAllReferenceLink(final String accessCodeText) {
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(accessCodeText);

        final List<ReferenceLinkEntity> referenceLinkEntities = referenceLinkRepository.findByPairRoomEntity(pairRoom);

        return referenceLinkEntities.stream()
                .map(this::makeReferenceLinkResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkResponse> findReferenceLinksByCategory(
            final String accessCodeText,
            final Long categoryId
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final CategoryEntity categoryEntity = categoryRepository.fetchByPairRoomAndCategoryId(pairRoomEntity,
                categoryId);
        final Category category = new Category(categoryEntity.getCategoryName());

        return referenceLinkRepository.findByPairRoomEntity(pairRoomEntity)
                .stream()
                .filter(link -> link.isSameCategory(category))
                .map(this::makeReferenceLinkResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkEntity> findReferenceLinksEntityByCategory(
            final String accessCodeText,
            final Long categoryId
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final CategoryEntity categoryEntity = categoryRepository.fetchByPairRoomAndCategoryId(pairRoomEntity,
                categoryId);
        final Category category = new Category(categoryEntity.getCategoryName());

        return referenceLinkRepository.findByPairRoomEntity(pairRoomEntity)
                .stream()
                .filter(link -> link.isSameCategory(category))
                .toList();
    }

    private ReferenceLinkResponse makeReferenceLinkResponse(final ReferenceLinkEntity referenceLinkEntity) {
        final OpenGraph openGraph = openGraphService.findOpenGraph(referenceLinkEntity.getId());
        return new ReferenceLinkResponse(referenceLinkEntity, openGraph);
    }

    public void deleteReferenceLink(final String accessCodeText, final long id) {
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.fetchById(id);
        validateOperationAllow(referenceLinkEntity.getPairRoomEntity().toDomain());
        if (referenceLinkEntity.isSameAccessCode(new AccessCode(accessCodeText))) {
            openGraphService.deleteByReferenceLink(referenceLinkEntity);
            referenceLinkRepository.delete(referenceLinkEntity);
        }
    }

    private void validateOperationAllow(final PairRoom pairRoom) {
        if (pairRoom.isCompleted()) {
            throw new OperateNotAllowedException("페어룸이 COMPLETED(종료) 상태이기 때문에 카테고리를 조작할 수 없습니다.");
        }
    }
}
