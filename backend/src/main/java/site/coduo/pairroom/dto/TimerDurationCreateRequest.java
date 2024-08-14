package site.coduo.pairroom.dto;

import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "타이머 시간 저장 요청 바디")
public record TimerDurationCreateRequest(@Schema(description = "타이머 시간") LocalTime timerDuration) {
}
