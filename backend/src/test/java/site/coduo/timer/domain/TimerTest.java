package site.coduo.timer.domain;

import static org.assertj.core.api.Assertions.assertThat;
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
        final PairRoom pairRoom = createPairRoom("프람", "레모네");
        final long timerDuration = 10;
        final long timerRemainingTime = 10;

        // when & then
        assertThatCode(() -> new Timer(pairRoom.getAccessCode(), timerDuration, timerRemainingTime))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("타이머 시간이 음수일 경우 예외가 발생한다.")
    void throw_exception_when_time_is_negative() {
        // given
        final PairRoom pairRoom = createPairRoom("레모네", "프람");
        final long timerDuration = -1;
        final long timerRemainingTime = 0;

        // when, then
        assertThatThrownBy(() -> new Timer(pairRoom.getAccessCode(), timerDuration, timerRemainingTime))
                .isInstanceOf(InvalidTimerException.class);
    }

    @Test
    @DisplayName("타어미 시간을 특정 시간 단위로 감소 시킨다.")
    void decrease_timer_remaining_time_by_specific_value() {
        // given
        final PairRoom pairRoom = createPairRoom("fram", "lemone");
        final Timer timer = new Timer(pairRoom.getAccessCode(), 10000L, 10000L);

        // when
        timer.decreaseRemainingTime(1000L);

        // then
        assertThat(timer.getRemainingTime()).isEqualTo(9000L);
    }

    @Test
    @DisplayName("타이머 시간보다 감소시키려는 시간이 더 크면 0으로 설정한다.")
    void when_timer_remaining_time_negative_value_then_set_zero() {
        // given
        final PairRoom pairRoom = createPairRoom("fram", "lemone");
        final Timer timer = new Timer(pairRoom.getAccessCode(), 10000L, 10000L);

        // when
        timer.decreaseRemainingTime(10001L);

        // then
        assertThat(timer.getRemainingTime()).isZero();
    }

    private PairRoom createPairRoom(final String navigator, final String driver) {
        return new PairRoom(
                new Pair(new PairName(navigator), new PairName(driver)),
                PairRoomStatus.IN_PROGRESS,
                new AccessCode("123456")
        );
    }
}
