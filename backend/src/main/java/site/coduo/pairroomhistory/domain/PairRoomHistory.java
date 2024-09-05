package site.coduo.pairroomhistory.domain;

import java.util.Objects;

import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroomhistory.exception.InvalidTimerException;

@Getter
public class PairRoomHistory {

    private final PairRoom pairRoom;
    private final long timerDuration;
    private final long timerRemainingTime;

    public PairRoomHistory(final PairRoom pairRoom, final long timerDuration, final long timerRemainingTime) {
        validateTime(timerDuration, timerRemainingTime);
        this.pairRoom = pairRoom;
        this.timerDuration = timerDuration;
        this.timerRemainingTime = timerRemainingTime;
    }

    private void validateTime(long timerDuration, long timerRemainingTime) {
        if (timerDuration < 0 || timerRemainingTime < 0) {
            throw new InvalidTimerException("타이머 시간과 남은 시간은 0 이상이어야 합니다.");
        }
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoomHistory that = (PairRoomHistory) o;
        return timerDuration == that.timerDuration && timerRemainingTime == that.timerRemainingTime
                && Objects.equals(pairRoom, that.pairRoom);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pairRoom, timerDuration, timerRemainingTime);
    }
}
