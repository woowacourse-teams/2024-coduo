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
    @DisplayName("특정 페어룸의 가장 최근 히스토리를 조회한다.")
    void inquiry_recent_history() {
        // given
        final PairRoom pairRoom = new PairRoom(new Pair(new PairName("레머네"), new PairName("프람")),
                PairRoomStatus.ONBOARDING, new AccessCode("hello1"));
        pairRoomRepository.save(pairRoom);

        final PairRoomHistory history1 = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("레머네")
                .navigator("프람")
                .timerRound(900000)
                .timerRemainingTime(1000)
                .build();

        final PairRoomHistory history2 = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("프람")
                .navigator("레머네")
                .timerRound(900000)
                .timerRemainingTime(1000)
                .build();

        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(history1));
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(history2));

        // when
        final PairRoomHistoryEntity actual = pairRoomHistoryRepository
                .findTopByPairRoomIdOrderByCreatedAtDesc(pairRoom.getId())
                .orElseThrow();

        // then
        assertThat(actual)
                .extracting("driver", "navigator", "timerRound", "timerRemainingTime")
                .contains(history2.getDriver(), history2.getNavigator(), history2.getTimerRound(),
                        history2.getTimerRemainingTime());
    }

    @Test
    @DisplayName("타이머 남은 시간을 업데이트한다.")
    void update_timer_remaining_time() {
        // given
        final PairRoom pairRoom = new PairRoom(new Pair(new PairName("솔라"), new PairName("네오")),
                PairRoomStatus.ONBOARDING, new AccessCode("hello2"));
        pairRoomRepository.save(pairRoom);

        final PairRoomHistory history = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver("솔라")
                .navigator("네오")
                .timerRound(900000)
                .timerRemainingTime(1000)
                .build();
        PairRoomHistoryEntity pairRoomHistoryEntity = pairRoomHistoryRepository.save(new PairRoomHistoryEntity(history));

        final long expectedTimerRemainingTime = 30;

        // when
        pairRoomHistoryRepository.updateByIdTimerRemainingTime(pairRoomHistoryEntity.getId(), expectedTimerRemainingTime);

        // then
        final PairRoomHistoryEntity actual = pairRoomHistoryRepository
                .findById(pairRoomHistoryEntity.getId())
                .orElseThrow();

        assertThat(actual.getTimerRemainingTime()).isEqualTo(expectedTimerRemainingTime);
    }
}
