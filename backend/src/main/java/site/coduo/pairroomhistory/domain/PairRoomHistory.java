package site.coduo.pairroomhistory.domain;

import java.util.Objects;

import lombok.Builder;
import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;

@Getter
public class PairRoomHistory {

    private final PairRoom pairRoom;
    private final String driver;
    private final String navigator;
    private final int timerRound;
    private final long timerRemainingTime;

    @Builder
    private PairRoomHistory(
            final PairRoom pairRoom,
            final String driver,
            final String navigator,
            final int timerRound,
            final long timerRemainingTime
    ) {
        this.pairRoom = pairRoom;
        this.driver = driver;
        this.navigator = navigator;
        this.timerRound = timerRound;
        this.timerRemainingTime = timerRemainingTime;
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
        return timerRound == that.timerRound && timerRemainingTime == that.timerRemainingTime && Objects.equals(
                pairRoom, that.pairRoom) && Objects.equals(driver, that.driver) && Objects.equals(
                navigator, that.navigator);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pairRoom, driver, navigator, timerRound, timerRemainingTime);
    }
}
