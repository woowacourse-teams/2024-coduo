package site.coduo.pairroomhistory.dto;

import site.coduo.pairroomhistory.domain.PairRoomHistory;

public record PairRoomHistoryReadResponse(
        long id,
        String driver,
        String navigator,
        int timerRound,
        long timerRemainingTime
) {

    public static PairRoomHistoryReadResponse of(final long id, final PairRoomHistory pairRoomHistory) {
        return new PairRoomHistoryReadResponse(
                id,
                pairRoomHistory.getDriver(),
                pairRoomHistory.getNavigator(),
                pairRoomHistory.getTimerRound(),
                pairRoomHistory.getTimerRemainingTime()
        );
    }
}
