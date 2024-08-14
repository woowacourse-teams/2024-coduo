package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.domain.Url;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@SpringBootTest
class OpenGraphServiceTest {

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
        openGraphRepository.deleteAll();
        referenceLinkRepository.deleteAll();
        categoryRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }

    @Test
    @DisplayName("오픈그래프를 생성 후 저장한다.")
    void create_open_graph() {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레모네")
                        )
                        , new AccessCode("123456"))
        );
        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoom, new Category("스프링")));
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new Url("https://www.naver.com"), new AccessCode("123456")),
                category,
                pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        openGraphService.createOpenGraphCommand(referenceLinkEntity);

        // then
        assertThat(openGraphRepository.findAll())
                .hasSize(1);
    }

    @DisplayName("일치하는 오픈그래프가 없으면 기본 값을 넣은 오픈그래프를 반환한다.")
    @Test
    void return_null_when_cannot_find_open_graph() {
        // given & when
        final OpenGraph openGraph = openGraphService.findOpenGraphQuery(1L);

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
    void delete_open_graph_by_reference_link_id() {
        // given
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레모네")
                        )
                        , new AccessCode("123456"))
        );

        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoom, new Category("스프링")));
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new Url("https://www.naver.com"), new AccessCode("123456")),
                category,
                pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);
        openGraphService.createOpenGraphCommand(referenceLinkEntity);

        // when
        openGraphService.deleteByReferenceLinkIdCommand(referenceLinkEntity.getId());

        // then
        assertThat(openGraphRepository.findAll()).isEmpty();
    }
}
