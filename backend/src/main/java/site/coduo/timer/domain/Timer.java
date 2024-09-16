package site.coduo.timer.domain;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.timer.exception.InvalidTimerException;

@Getter
public class Timer {

    private final PairRoom pairRoom;
    private final long duration;
    private final AtomicLong remainingTime;

    public Timer(final PairRoom pairRoom, final long duration, final long timerRemainingTime) {
        validateTime(duration, timerRemainingTime);
        this.pairRoom = pairRoom;
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
        final Timer that = (Timer) o;
        return duration == that.duration && remainingTime == that.remainingTime
                && Objects.equals(pairRoom, that.pairRoom);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pairRoom, duration, remainingTime);
    }
}
