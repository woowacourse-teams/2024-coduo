package site.coduo.pairroomhistory.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroomhistory.exception.InvalidTimerException;

class TimerTest {

    @Test
    @DisplayName("타이머를 생성한다.")
    void create_timer() {
        // given
        long timerDuration = 10;
        long timerRemainingTime = 10;

        // when & then
        assertThatCode(() -> Timer.of(timerDuration, timerRemainingTime))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("타이머 시간이 음수일 경우 예외가 발생한다.")
    void throw_exception_when_time_is_negative() {
        // given
        final long timerDuration = -1;
        final long timerRemainingTime = 0;

        // when, then
        assertThatThrownBy(() -> Timer.of(timerDuration, timerRemainingTime))
                .isInstanceOf(InvalidTimerException.class);
    }

    @Test
    @DisplayName("타이머 총 시간보다 남은 시간이 더 클 경우 예외가 발생한다.")
    void throw_exception_when_remaining_time_is_greater_than_duration() {
        // given
        final long timerDuration = 10;
        final long timerRemainingTime = 11;

        // when, then
        assertThatThrownBy(() -> Timer.of(timerDuration, timerRemainingTime))
                .isInstanceOf(InvalidTimerException.class);
    }
}
