package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.PairRoomFixture.KELY_LEMONE_ROOM;

import java.net.MalformedURLException;
import java.net.URL;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
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
    void create_open_graph() throws MalformedURLException {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(KELY_LEMONE_ROOM);
        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoom, new Category("스프링")));
        final URL url = new URL("https://www.naver.com");
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode("123456")),
                category,
                pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        openGraphService.createOpenGraph(referenceLinkEntity, url);

        // then
        assertThat(openGraphRepository.findAll())
                .hasSize(1);
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
        final PairRoom pairRoom = pairRoomRepository.save(KELY_LEMONE_ROOM);

        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoom, new Category("스프링")));
        final URL url = new URL("https://www.naver.com");
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(url, new AccessCode("123456")),
                category,
                pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);
        openGraphService.createOpenGraph(referenceLinkEntity, url);

        // when
        openGraphService.deleteByReferenceLinkId(referenceLinkEntity.getId());

        // then
        assertThat(openGraphRepository.findAll()).isEmpty();
    }
}
