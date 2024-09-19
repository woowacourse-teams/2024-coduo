package site.coduo.timer.service.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "타이머 남은 시간 업데이트 요청 바디")
public record TimerRemainingTimeUpdateRequest(
        @Schema(description = "타이머가 종료되기까지 남은 시간이 업데이트 된다.", example = "60000")
        @NotNull
        long remainingTime
) {
}
