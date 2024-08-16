package site.coduo.pairroomhistory.repository;

import static org.assertj.core.api.Assertions.assertThat;

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
import site.coduo.pairroomhistory.domain.PairRoomHistory;

@SpringBootTest
class PairRoomHistoryRepositoryTest {

    @Autowired
    private PairRoomHistoryRepository pairRoomHistoryRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @AfterEach
    void tearDown() {
        pairRoomHistoryRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }

    @Test
    @DisplayName("가장 최근 히스토리를 조회한다.")
    void inquiry_recent_history() {
        // given
        final PairRoom pairRoom = new PairRoom(new Pair(new PairName("레머네"), new PairName("프람")),
                new AccessCode("hello"));
        pairRoomRepository.save(pairRoom);

        final PairRoomHistory history1 = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("레머네")
                .navigator("프람")
                .timerRound(1)
                .timerRemainingTime(1000)
                .build();

        final PairRoomHistory history2 = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("프람")
                .navigator("레머네")
                .timerRound(2)
                .timerRemainingTime(1000)
                .build();

        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(history1));
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(history2));

        // when
        final PairRoomHistory domain = pairRoomHistoryRepository.findTopByPairRoomIdOrderByCreatedAtDesc(
                        pairRoom.getId())
                .orElseThrow()
                .toDomain();

        // then
        assertThat(domain)
                .extracting("driver", "navigator", "timerRound", "timerRemainingTime")
                .contains(history2.getDriver(), history2.getNavigator(), history2.getTimerRound(),
                        history2.getTimerRemainingTime());
    }
}
