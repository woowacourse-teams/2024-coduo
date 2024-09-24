package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.PairRoomFixture.INK_REDDDY_ROOM;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
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

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("레퍼런스 링크와 오픈그래프를 함께 저장한다.")
    void save_reference_link_and_open_graph() {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest(
                FakeServer.testUrl, category.getId());

        // when
        referenceLinkService.createReferenceLink(pairRoomEntity.getAccessCode(), request);

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).hasSize(1),
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> {
                    final ReferenceLinkResponse referenceLinkResponses =
                            referenceLinkService.readAllReferenceLink(pairRoomEntity.getAccessCode()).get(0);
                    assertThat(referenceLinkResponses.url()).isEqualTo(request.url());
                    assertThat(referenceLinkResponses.headTitle()).isEqualTo("헤드 타이틀");
                    assertThat(referenceLinkResponses.openGraphTitle()).isEqualTo("오픈그래프 타이틀");
                    assertThat(referenceLinkResponses.description()).isEqualTo("오픈그래프 설명");
                    assertThat(referenceLinkResponses.image()).isEqualTo("오픈그래프 이미지");
                    assertThat(referenceLinkResponses.categoryName()).isEqualTo("스프링");
                }
        );
    }

    @Test
    @DisplayName("잘못된 url로 저장을 시도하면 예외가 발생한다.")
    void throw_exception_when_invalid_url_format() {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest(
                "failUrl", null);

        // when & then
        assertThatThrownBy(
                () -> referenceLinkService.createReferenceLink(pairRoomEntity.getAccessCode(), request))
                .isInstanceOf(InvalidUrlFormatException.class);
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회한다.")
    void search_all_reference_link() throws MalformedURLException {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("자바")));
        final AccessCode accessCode = new AccessCode(pairRoomEntity.getAccessCode());
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL(FakeServer.testUrl), accessCode),
                        category,
                        pairRoomEntity));
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL(FakeServer.testUrl), accessCode),
                        category,
                        pairRoomEntity));
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL(FakeServer.testUrl), accessCode),
                        category,
                        pairRoomEntity));

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
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("리액트")));
        final ReferenceLinkEntity link = referenceLinkRepository.save(
                new ReferenceLinkEntity(
                        new ReferenceLink(new URL(FakeServer.testUrl),
                                new AccessCode(pairRoomEntity.getAccessCode())),
                        category, pairRoomEntity));

        // when
        referenceLinkService.deleteReferenceLink(link.getId());

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).isEmpty(),
                () -> assertThat(openGraphRepository.findAll()).isEmpty()
        );
    }

    @Test
    @DisplayName("카테고리가 일치하는 모든 레퍼런스 링크를 조회한다.")
    void find_reference_links_by_category() throws MalformedURLException {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity reactCategory = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("리액트")));
        final CategoryEntity springCategory = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));

        final ReferenceLinkEntity reactReferenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new URL(FakeServer.testUrl),
                        new AccessCode(pairRoomEntity.getAccessCode())),
                reactCategory, pairRoomEntity);
        final ReferenceLinkEntity reactReferenceLink2 = new ReferenceLinkEntity(
                new ReferenceLink(new URL(FakeServer.testUrl),
                        new AccessCode(pairRoomEntity.getAccessCode())),
                reactCategory, pairRoomEntity);
        final ReferenceLinkEntity springReferenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new URL(FakeServer.testUrl),
                        new AccessCode(pairRoomEntity.getAccessCode())),
                springCategory, pairRoomEntity);

        referenceLinkRepository.save(reactReferenceLink);
        referenceLinkRepository.save(reactReferenceLink2);
        referenceLinkRepository.save(springReferenceLink);

        // when
        final List<ReferenceLinkResponse> referenceLinksByCategory = referenceLinkService.findReferenceLinksByCategory(
                pairRoomEntity.getAccessCode(), reactCategory.getId());

        // then
        assertThat(referenceLinksByCategory).hasSize(2);
    }
}
