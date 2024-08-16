package site.coduo.pairroomhistory.dto;

public record PairRoomHistoryReadResponse(
        long id,
        String driver,
        String navigator,
        int timerRound,
        long timerRemainingTime
) {
}
