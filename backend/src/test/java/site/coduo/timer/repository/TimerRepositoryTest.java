package site.coduo.timer.repository;

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
import site.coduo.timer.domain.Timer;

@Transactional
@SpringBootTest
class TimerRepositoryTest {

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @AfterEach
    void tearDown() {
        timerRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }

    @Test
    @DisplayName("특정 페어룸의 타이머를 조회한다.")
    void inquiry_timer() {
        // given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("레머네"), new PairName("프람")),
                PairRoomStatus.IN_PROGRESS,
                new AccessCode("hello1")
        );
        pairRoomRepository.save(pairRoom);
        final Timer timer = new Timer(pairRoom, 1111, 234);
        timerRepository.save(new TimerEntity(timer));

        // when
        final TimerEntity actual = timerRepository
                .fetchTimerByPairRoomId(pairRoom.getId());

        // then
        assertThat(actual)
                .extracting("duration", "remainingTime")
                .contains(timer.getDuration(), timer.getRemainingTime());
    }
}
