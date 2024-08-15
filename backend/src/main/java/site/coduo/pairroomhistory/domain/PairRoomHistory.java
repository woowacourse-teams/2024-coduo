package site.coduo.pairroomhistory.domain;

import lombok.Builder;
import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;

@Getter
public class PairRoomHistory {

    private final PairRoom pairRoom;
    private final String driver;
    private final String navigator;
    private final int timerRound;
    private final long timerRemainigTime;

    @Builder
    private PairRoomHistory(
            final PairRoom pairRoom,
            final String driver,
            final String navigator,
            final int timerRound,
            final long timerRemainigTime
    ) {
        this.pairRoom = pairRoom;
        this.driver = driver;
        this.navigator = navigator;
        this.timerRound = timerRound;
        this.timerRemainigTime = timerRemainigTime;
    }
}
