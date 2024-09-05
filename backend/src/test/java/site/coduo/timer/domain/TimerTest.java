package site.coduo.timer.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.timer.exception.InvalidTimerException;

class TimerTest {

    @Test
    @DisplayName("타이머를 생성한다.")
    void create_timer() {
        // given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("프람"), new PairName("레모네")),
                PairRoomStatus.IN_PROGRESS,
                new AccessCode("123456")
        );
        final long timerDuration = 10;
        final long timerRemainingTime = 10;

        // when & then
        assertThatCode(() -> new Timer(pairRoom, timerDuration, timerRemainingTime))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("타이머 시간이 음수일 경우 예외가 발생한다.")
    void throw_exception_when_time_is_negative() {
        // given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("프람"), new PairName("레모네")),
                PairRoomStatus.IN_PROGRESS,
                new AccessCode("123456")
        );
        final long timerDuration = -1;
        final long timerRemainingTime = 0;

        // when, then
        assertThatThrownBy(() -> new Timer(pairRoom, timerDuration, timerRemainingTime))
                .isInstanceOf(InvalidTimerException.class);
    }
}
