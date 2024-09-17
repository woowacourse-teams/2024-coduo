package site.coduo.timer.domain;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import lombok.Getter;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.timer.exception.InvalidTimerException;

@Getter
public class Timer {

    private final AccessCode accessCode;
    private final long duration;
    private final AtomicLong remainingTime;

    public Timer(final AccessCode accessCode, final long duration, final long timerRemainingTime) {
        validateTime(duration, timerRemainingTime);
        this.accessCode = accessCode;
        this.duration = duration;
        this.remainingTime = new AtomicLong(timerRemainingTime);
    }

    private void validateTime(long timerDuration, long timerRemainingTime) {
        if (timerDuration < 0 || timerRemainingTime < 0) {
            throw new InvalidTimerException("타이머 시간과 남은 시간은 0 이상이어야 합니다.");
        }
    }

    public long getRemainingTime() {
        return remainingTime.get();
    }

    public void decreaseRemainingTime(final long decrease) {
        if (remainingTime.get() == 0L) {
            return;
        }
        if (remainingTime.get() < decrease) {
            remainingTime.set(0);
            return;
        }
        remainingTime.set(remainingTime.get() - decrease);
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final Timer timer = (Timer) o;
        return duration == timer.duration && Objects.equals(accessCode, timer.accessCode)
                && Objects.equals(remainingTime, timer.remainingTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accessCode, duration, remainingTime);
    }
}
