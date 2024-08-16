package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "타이머 시간 저장 요청 바디")
public record TimerDurationCreateRequest(
        @Schema(description = "타이머 시간. millisecond 기준으로 저장한다.", example = "60000")
        long timerDuration
) {
}
