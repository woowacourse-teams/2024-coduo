package site.coduo.pairroomhistory.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 최근 히스토리 타이머 시간 업데이트 요청 바디")
public record PairRoomHistoryTimerDurationUpdateRequest(
        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "900000")
        long timerDuration
) {
}
