package site.coduo.timer.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.timer.repository.TimerRepository;

@Import(TestConfig.class)
@SpringBootTest
class FixedDelaySchedulerTest {

    @Autowired
    private PairRoomRepository pairRoomRepository;
    @Autowired
    private TimerRepository timerRepository;
    @Autowired
    private FixedDelayScheduler fixedDelayScheduler;

    @Test
    @DisplayName("특정 방의 타이머를 실행시킨다.")
    void start_specific_pair_room_timer() {
        // given
        final Pair pair = new Pair(new PairName("fram"), new PairName("lemone"));
        final PairRoom pairRoom = new PairRoom(pair, PairRoomStatus.IN_PROGRESS, new AccessCode("test-access"));
        pairRoomRepository.save(PairRoomEntity.from(pairRoom));
        final Timer timer = new Timer(pairRoom, 10000L, 10000L);

        // when
        fixedDelayScheduler.start(timer);

        // then
        assertThat(timer.getRemainingTime()).isEqualTo(9000L);
    }

}
