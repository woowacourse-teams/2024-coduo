package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.domain.Url;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;

@Transactional
@SpringBootTest
public class OpenGraphServiceTest {

    @Autowired
    private OpenGraphService openGraphService;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Test
    @DisplayName("오픈그래프를 생성 후 저장한다.")
    void create_open_graph() {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(new PairRoom(
                new PairName("잉크"),
                new PairName("레모네")
        ));
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new Url("https://www.naver.com"),
                        new AccessCode("123456")), pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);

        // when
        openGraphService.createOpenGraphCommand(referenceLinkEntity);

        // then
        assertThat(openGraphRepository.findAll())
                .hasSize(1);
    }

    @DisplayName("일치하는 오픈그래프가 없으면 null을 반환한다.")
    @Test
    void return_null_when_cannot_find_open_graph() {
        // given

        // when & then
        assertThat(openGraphService.findOpenGraphQuery(1L)).isNull();
    }

    @DisplayName("레퍼런스링크 id로 오픈그래프를 삭제한다.")
    @Test
    void delete_open_graph_by_reference_link_id() {
        // given
        final PairRoom pairRoom = pairRoomRepository.save(new PairRoom(
                new PairName("잉크"),
                new PairName("레모네")
        ));
        final ReferenceLinkEntity referenceLink = new ReferenceLinkEntity(
                new ReferenceLink(new Url("https://www.naver.com"),
                        new AccessCode("123456")), pairRoom
        );
        final ReferenceLinkEntity referenceLinkEntity = referenceLinkRepository.save(referenceLink);
        openGraphService.createOpenGraphCommand(referenceLinkEntity);

        // when
        openGraphService.deleteByReferenceLinkIdCommand(1L);

        // then
        assertThat(openGraphRepository.findAll())
                .hasSize(0);
    }
}
