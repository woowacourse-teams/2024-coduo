package site.coduo.referencelink.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.InactivePairRoomException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.InvalidUrlFormatException;
import site.coduo.referencelink.mq.MQService;
import site.coduo.referencelink.mq.ReferenceLinkMQMessageDto;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphEntity;
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
    private final MQService mqService;

    public ReferenceLinkResponse createReferenceLink(
            final String accessCodeText,
            final ReferenceLinkCreateRequest request
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkPairRoomIsActive(pairRoomEntity);
        final URL url = makeUrl(request.url());
        final ReferenceLink referenceLink = new ReferenceLink(url, accessCode);

        final ReferenceLinkEntity referenceLinkEntity = saveReferenceLink(request, pairRoomEntity, referenceLink);
        final OpenGraph openGraph = openGraphService.createOpenGraph(referenceLinkEntity, url);
        return new ReferenceLinkResponse(referenceLinkEntity, openGraph);
    }

    public void createReferenceLinkWithSimpleOpenGraph(
            final String accessCodeText,
            final ReferenceLinkCreateRequest request
    ) {
        final AccessCode accessCode = new AccessCode(accessCodeText);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkPairRoomIsActive(pairRoomEntity);
        final URL url = makeUrl(request.url());
        final ReferenceLink referenceLink = new ReferenceLink(url, accessCode);

        final ReferenceLinkEntity referenceLinkEntity = saveReferenceLink(request, pairRoomEntity, referenceLink);
        final OpenGraphEntity openGraphEntity = openGraphService.createHeadTitle(referenceLinkEntity, url);
        final ReferenceLinkMQMessageDto referenceLinkMQMessageDto = new ReferenceLinkMQMessageDto(url, pairRoomEntity,
                openGraphEntity.getId());
        mqService.sendMessage(referenceLinkMQMessageDto);
    }

    private URL makeUrl(final String requestUrl) {
        try {
            return new URL(requestUrl);
        } catch (final MalformedURLException e) {
            throw new InvalidUrlFormatException("링크 형식이 맞지 않습니다.");
        }
    }

    private ReferenceLinkEntity saveReferenceLink(
            final ReferenceLinkCreateRequest request,
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
    public List<ReferenceLinkResponse> findReferenceLinksByCategory(
            final String accessCodeText,
            final Long categoryId
    ) {
        final List<ReferenceLinkResponse> allReferenceLinks = findAllReferenceLinkWithOpenGraphByAccessCode(
                accessCodeText);
        return filterByCategoryId(allReferenceLinks, categoryId);
    }

    @Transactional(readOnly = true)
    public List<ReferenceLinkResponse> findAllReferenceLinkWithOpenGraphByAccessCode(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final List<OpenGraphEntity> openGraphEntities = openGraphService.findAllByPairRoomEntity(pairRoomEntity);
        return ReferenceLinkResponse.from(openGraphEntities);
    }

    private List<ReferenceLinkResponse> filterByCategoryId(final List<ReferenceLinkResponse> allReferenceLinks,
                                                           final Long categoryId) {
        return allReferenceLinks.stream()
                .filter(referenceLink -> referenceLink.categoryId().equals(categoryId))
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

    public void deleteReferenceLink(final String accessCodeText, final long id) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCodeText);
        checkPairRoomIsActive(pairRoomEntity);
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.fetchById(id);
        if (referenceLinkEntity.isSameAccessCode(new AccessCode(accessCodeText))) {
            openGraphService.deleteByReferenceLink(referenceLinkEntity);
            referenceLinkRepository.delete(referenceLinkEntity);
        }
    }

    private void checkPairRoomIsActive(final PairRoomEntity pairRoomEntity) {
        if (!pairRoomEntity.isActive()) {
            throw new InactivePairRoomException("이미 종료되었거나 삭제된 페어룸의 링크를 조작할 수 없습니다.");
        }
    }
}
