package site.coduo.pairroomhistory.domain;

import lombok.Getter;
import site.coduo.pairroomhistory.exception.InvalidTimerException;

@Getter
public class Timer {

    public static final int FIRST_ROUND = 1;

    private final int timerRound;
    private final long timerDuration;
    private final long timerRemainingTime;

    public Timer(final int timerRound, final long timerDuration, final long timerRemainingTime) {
        validateTime(timerDuration, timerRemainingTime);

        this.timerRound = timerRound;
        this.timerDuration = timerDuration;
        this.timerRemainingTime = timerRemainingTime;
    }

    private void validateTime(long timerDuration, long timerRemainingTime) {
        if (timerDuration < 0 || timerRemainingTime < 0) {
            throw new InvalidTimerException("타이머 시간과 남은 시간은 0 이상이어야 합니다.");
        }

        if (timerDuration < timerRemainingTime) {
            throw new InvalidTimerException("타이머 시간은 남은 시간보다 작을 수 없습니다.");
        }
    }

    public static Timer of(long timerDuration, long timerRemainingTime) {
        return new Timer(FIRST_ROUND, timerDuration, timerRemainingTime);
    }

    public Timer increaseTimerRound() {
        return new Timer(timerRound + 1, timerDuration, timerRemainingTime);
    }
}
