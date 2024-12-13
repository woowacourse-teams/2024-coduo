package site.coduo.timer.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.timer.domain.Timer;

@Schema(description = "티이머 조회 응답 바디")
public record TimerReadResponse(
        @Schema(description = "타이머 식별자", example = "1")
        long id,

        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "100000")
        long duration,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준이다.", example = "60000")
        long remainingTime
) {

    public static TimerReadResponse of(final long id, final Timer timer) {
        return new TimerReadResponse(id, timer.getDuration(), timer.getRemainingTime());
    }
}
