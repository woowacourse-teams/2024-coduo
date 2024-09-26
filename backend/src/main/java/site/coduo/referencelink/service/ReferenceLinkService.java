package site.coduo.referencelink.service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.pairroom.domain.accesscode.AccessCode;
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
        log.info("[Reference Link] 2. readAllReferenceLink 메서드 호출 시작!");
        log.info("[Reference Link] 3. referenceLinkRepository.findAll() 호출 시작!");
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(accessCodeText);

        final List<ReferenceLinkEntity> referenceLinkEntities = referenceLinkRepository.findByPairRoomEntity(pairRoom);

        log.info("[Reference Link] 4. referenceLinkRepository.findAll() 반환 데이터 필터링 시작!!");
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

    public void deleteReferenceLink(final long id) {
        openGraphService.deleteByReferenceLinkId(id);
        referenceLinkRepository.deleteById(id);
    }
}
