package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.PairRoomFixture.INK_REDDDY_ROOM;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.InvalidUrlFormatException;
import site.coduo.referencelink.fake.FakeServer;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.utils.CascadeCleaner;

@SpringBootTest
class ReferenceLinkServiceTest extends CascadeCleaner {

    @Autowired
    private ReferenceLinkService referenceLinkService;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private PairRoomEntity pairRoomEntity;
    private CategoryEntity reactCategory;
    private CategoryEntity springCategory;

    @BeforeEach
    void setUp() {
        pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        reactCategory = categoryRepository.save(new CategoryEntity(pairRoomEntity, new Category("리액트")));
        springCategory = categoryRepository.save(new CategoryEntity(pairRoomEntity, new Category("스프링")));
    }

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("레퍼런스 링크와 오픈그래프를 함께 저장한다.")
    void save_reference_link_and_open_graph() {
        // given
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest(
                FakeServer.testUrl, springCategory.getId());

        // when
        referenceLinkService.createReferenceLink(pairRoomEntity.getAccessCode(), request);

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).hasSize(1),
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> {
                    final ReferenceLinkResponse referenceLinkResponses =
                            referenceLinkService.readAllReferenceLink(pairRoomEntity.getAccessCode()).get(0);
                    assertThat(referenceLinkResponses)
                            .extracting("url", "headTitle", "openGraphTitle", "description", "image", "categoryName")
                            .contains(request.url(), "헤드 타이틀", "오픈그래프 타이틀", "오픈그래프 설명", "오픈그래프 이미지", "스프링");
                }
        );
    }

    @Test
    @DisplayName("잘못된 url로 저장을 시도하면 예외가 발생한다.")
    void throw_exception_when_invalid_url_format() {
        // given
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest("failUrl", null);

        // when & then
        assertThatThrownBy(
                () -> referenceLinkService.createReferenceLink(pairRoomEntity.getAccessCode(), request))
                .isInstanceOf(InvalidUrlFormatException.class);
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회한다.")
    void search_all_reference_link() throws MalformedURLException {
        // given
        final AccessCode accessCode = new AccessCode(pairRoomEntity.getAccessCode());
        referenceLinkRepository.save(generateReferenceLink(springCategory));
        referenceLinkRepository.save(generateReferenceLink(springCategory));
        referenceLinkRepository.save(generateReferenceLink(reactCategory));

        // when
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLink(
                accessCode.getValue());
        // then
        assertThat(responses).hasSize(3);
    }

    @Test
    @DisplayName("레퍼런스 링크와 오픈그래프를 삭제한다.")
    void delete_reference_link_and_open_graph() throws MalformedURLException {
        // given
        final ReferenceLinkEntity referenceLink = generateReferenceLink(reactCategory);
        final ReferenceLinkEntity saved = referenceLinkRepository.save(referenceLink);

        // when
        referenceLinkService.deleteReferenceLink(pairRoomEntity.getAccessCode(), saved.getId());

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).isEmpty(),
                () -> assertThat(openGraphRepository.findAll()).isEmpty()
        );
    }

    @DisplayName("액세스코드가 일치하지 않으면 삭제를 시도해도 삭제되지 않는다.")
    @Test
    void cannot_delete_reference_link_and_open_graph_when_invalid_access_code() throws MalformedURLException {
        // given
        final ReferenceLinkCreateRequest request =
                new ReferenceLinkCreateRequest(FakeServer.testUrl, springCategory.getId());
        final ReferenceLinkResponse referenceLink = referenceLinkService.createReferenceLink(
                pairRoomEntity.getAccessCode(), request);

        // when
        referenceLinkService.deleteReferenceLink("abcdef", referenceLink.id());

        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).hasSize(1),
                () -> assertThat(openGraphRepository.findAll()).hasSize(1)
        );
    }

    @Test
    @DisplayName("카테고리가 일치하는 모든 레퍼런스 링크를 조회한다.")
    void find_reference_links_by_category() throws MalformedURLException {
        // given
        final ReferenceLinkEntity reactReferenceLink = generateReferenceLink(reactCategory);
        final ReferenceLinkEntity reactReferenceLink2 = generateReferenceLink(reactCategory);
        final ReferenceLinkEntity springReferenceLink = generateReferenceLink(springCategory);

        referenceLinkRepository.save(reactReferenceLink);
        referenceLinkRepository.save(reactReferenceLink2);
        referenceLinkRepository.save(springReferenceLink);

        // when
        final List<ReferenceLinkResponse> referenceLinksByCategory = referenceLinkService.findReferenceLinksByCategory(
                pairRoomEntity.getAccessCode(), reactCategory.getId());

        // then
        assertThat(referenceLinksByCategory).hasSize(2);
    }

    private ReferenceLinkEntity generateReferenceLink(final CategoryEntity category) throws MalformedURLException {
        return new ReferenceLinkEntity(new ReferenceLink(new URL(FakeServer.testUrl),
                new AccessCode(pairRoomEntity.getAccessCode())),
                category, pairRoomEntity);
    }
}
