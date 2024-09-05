package site.coduo.pairroomhistory.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroomhistory.domain.PairRoomHistory;

@Schema(description = "페어룸 히스토리 조회 응답 바디")
public record PairRoomHistoryReadResponse(
        @Schema(description = "페어룸 히스토리 식별자", example = "1")
        long id,

        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "100000")
        long timerDuration,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준이다.", example = "60000")
        long timerRemainingTime
) {

    public static PairRoomHistoryReadResponse of(final long id, final PairRoomHistory pairRoomHistory) {
        return new PairRoomHistoryReadResponse(id, pairRoomHistory.getTimerDuration(), pairRoomHistory.getTimerRemainingTime());
    }
}
