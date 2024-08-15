package site.coduo.pairroomhistory.dto;

public record PairRoomHistoryCreateRequest(String driver, String navigator, int timerRound, long timerRemainigTime) {
}
