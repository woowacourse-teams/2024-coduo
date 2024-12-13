package site.coduo.timer.service.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = " 타이머 업데이트 요청 바디")
public record TimerUpdateRequest(
        @Schema(description = "타이머 시간 (millisecond 기준)", example = "900000")
        long duration,

        @Schema(description = "타이머가 종료되기까지 남은 시간 (millisecond 기준)", example = "900000")
        @NotNull
        long remainingTime
) {
}
