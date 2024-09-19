package site.coduo.timer.service.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "타이머 생성 요청 바디")
public record TimerCreateRequest(
        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "100000")
        @NotNull
        long duration,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준이다.", example = "60000")
        @NotNull
        long remainingTime
) {
}
