package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.referencelink.service.dto.ReferenceLinkUpdateRequest;

@Transactional
@SpringBootTest
class ReferenceLinkServiceTest {

    @Autowired
    private ReferenceLinkService referenceLinkService;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Test
    @DisplayName("레퍼런스 링크를 저장한다.")
    void save_reference_link() {
        // given
        final PairRoom pairRoom = pairRoomRepository.save(new PairRoom(new PairName("first"), new PairName("second")));
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest("url");

        // when
        referenceLinkService.createReferenceLinkCommand(pairRoom.getAccessCodeText(), request);

        // then
        assertThat(referenceLinkRepository.findAll())
                .hasSize(1);
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회한다.")
    void search_all_reference_link() {
        // given
        final PairRoom pairRoom = pairRoomRepository.save(new PairRoom(new PairName("first"), new PairName("second")));
        final AccessCode accessCode = pairRoom.getAccessCode();
        referenceLinkRepository.save(new ReferenceLinkEntity(new ReferenceLink("url1", accessCode), pairRoom));
        referenceLinkRepository.save(new ReferenceLinkEntity(new ReferenceLink("url2", accessCode), pairRoom));
        referenceLinkRepository.save(new ReferenceLinkEntity(new ReferenceLink("url3", accessCode), pairRoom));

        // when
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLinkQuery(accessCode.getValue());

        // then
        assertThat(responses).hasSize(3);
    }

    @Test
    @DisplayName("레퍼런스 링크를 삭제한다.")
    void delete_reference_link() {
        // given
        final PairRoom pairRoom = pairRoomRepository.save(new PairRoom(new PairName("first"), new PairName("second")));
        final AccessCode accessCode = pairRoom.getAccessCode();
        final ReferenceLinkEntity link = referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink("url1", accessCode), pairRoom));

        // when
        referenceLinkService.deleteReferenceLinkCommand(link.getId());

        // then
        assertThat(referenceLinkRepository.findAll()).isEmpty();
    }
}
