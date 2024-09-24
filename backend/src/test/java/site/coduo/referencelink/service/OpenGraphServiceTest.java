package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.PairRoomFixture.INK_REDDDY_ROOM;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.fake.FakeServer;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.utils.CascadeCleaner;

@SpringBootTest
class OpenGraphServiceTest extends CascadeCleaner {

    private static final String DEFAULT_OPEN_GRAPH_VALUE = "";

    @Autowired
    private OpenGraphService openGraphService;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("오픈그래프를 생성 후 저장한다.")
    void create_open_graph_exactly() throws IOException {
        //given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));

        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));

        final URL url = new URL(FakeServer.testUrl);
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode(pairRoomEntity.getAccessCode())),
                category,
                pairRoomEntity
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        final OpenGraph openGraph = openGraphService.createOpenGraph(referenceLinkEntity, url);

        // then
        assertAll(
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo("헤드 타이틀"),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo("오픈그래프 타이틀"),
                () -> assertThat(openGraph.getDescription()).isEqualTo("오픈그래프 설명"),
                () -> assertThat(openGraph.getImage()).isEqualTo("오픈그래프 이미지")
        );
    }

    @DisplayName("일치하는 오픈그래프가 없으면 기본 값을 넣은 오픈그래프를 반환한다.")
    @Test
    void return_null_when_cannot_find_open_graph() {
        // given & when
        final OpenGraph openGraph = openGraphService.findOpenGraph(1L);

        // then
        assertAll(
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getDescription()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE)
        );
    }

    @DisplayName("레퍼런스링크 id로 오픈그래프를 삭제한다.")
    @Test
    void delete_open_graph_by_reference_link_id() throws MalformedURLException {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));

        final URL url = new URL(FakeServer.testUrl);
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode(pairRoomEntity.getAccessCode())),
                category,
                pairRoomEntity
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);
        openGraphService.createOpenGraph(referenceLinkEntity, url);

        // when
        openGraphService.deleteByReferenceLinkId(referenceLinkEntity.getId());

        // then
        assertThat(openGraphRepository.findAll()).isEmpty();
    }

    @DisplayName("링크의 도큐먼트를 가져오지 못했을때 헤드타이틀에 도메인을 넣어 생성 후 저장한다.")
    @Test
    void create_openGraph_when_cannot_get_document() throws IOException {
        //given
        final int assignedPort = FakeServer.createAndStartFakeServer(null);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));

        final URL url = new URL("http://localhost:" + assignedPort + "/test");
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode(pairRoomEntity.getAccessCode())),
                category,
                pairRoomEntity
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        final OpenGraph openGraph = openGraphService.createOpenGraph(referenceLinkEntity, url);

        // then
        assertAll(
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo("localhost"),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getDescription()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getImage()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE)
        );

        assertThat(openGraphRepository.findAll()).hasSize(1);
    }

    @DisplayName("링크의 오픈그래프 타이틀, 헤드타이틀이 없으면 헤드타이틀에 도메인을 넣어 생성 후 저장한다.")
    @Test
    void create_openGraph_when_titles_are_empty() throws IOException {
        //given
        final String html = "<html><head>" +
                "<meta property=\"og:description\" content=\"오픈그래프 설명\">" +
                "<meta property=\"og:image\" content=\"오픈그래프 이미지\">" +
                "</head><body></body></html>";
        final int assignedPort = FakeServer.createAndStartFakeServer(html);

        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category("스프링")));

        final URL url = new URL("http://localhost:" + assignedPort + "/test");
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode(pairRoomEntity.getAccessCode())),
                category,
                pairRoomEntity
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        final OpenGraph openGraph = openGraphService.createOpenGraph(referenceLinkEntity, url);

        // then
        assertAll(
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> assertThat(openGraph.getHeadTitle()).isEqualTo("localhost"),
                () -> assertThat(openGraph.getOpenGraphTitle()).isEqualTo(DEFAULT_OPEN_GRAPH_VALUE),
                () -> assertThat(openGraph.getDescription()).isEqualTo("오픈그래프 설명"),
                () -> assertThat(openGraph.getImage()).isEqualTo("오픈그래프 이미지")
        );
    }
}
