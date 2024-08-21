package site.coduo.pairroomhistory.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroomhistory.domain.PairRoomHistory;
import site.coduo.pairroomhistory.domain.Timer;

@Transactional
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
    @DisplayName("특정 페어룸의 히스토리가 여러개 있을 때, 가장 최근 히스토리를 조회한다.")
    void inquiry_recent_history() {
        // given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("레머네"), new PairName("프람")),
                PairRoomStatus.IN_PROGRESS,
                new AccessCode("hello1")
        );
        pairRoomRepository.save(pairRoom);
        final PairRoomHistory latestHistory = saveTwoHistoryAndReturnLastOne(pairRoom);
        final Timer latestTimer = latestHistory.getTimer();

        // when
        final PairRoomHistoryEntity actual = pairRoomHistoryRepository
                .fetchLatestHistoryByPairRoomId(pairRoom.getId());

        // then
        assertThat(actual)
                .extracting("driver", "navigator", "timerRound", "timerDuration", "timerRemainingTime")
                .contains(latestHistory.getDriver(), latestHistory.getNavigator(), latestTimer.getTimerRound(),
                        latestTimer.getTimerDuration(), latestTimer.getTimerRemainingTime());
    }

    private PairRoomHistory saveTwoHistoryAndReturnLastOne(final PairRoom pairRoom) {
        final PairRoomHistory firstHistory = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("레머네")
                .navigator("프람")
                .timer(new Timer(1, 1000, 1000))
                .build();
        final PairRoomHistory secondHistory = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("프람")
                .navigator("레머네")
                .timer(new Timer(2, 1000, 1000))
                .build();
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(firstHistory));
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(secondHistory));
        return secondHistory;
    }
}
