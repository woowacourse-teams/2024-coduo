package site.coduo.pairroomhistory.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 히스토리 생성 요청 바디")
public record PairRoomHistoryCreateRequest(
        @Schema(description = "드라이버 이름", example = "레모네")
        @NotBlank
        String driver,

        @Schema(description = "네비게이터 이름", example = "해시")
        @NotBlank
        String navigator,

        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "100000")
        @NotNull
        long timerDuration,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준이다.", example = "60000")
        @NotNull
        long timerRemainingTime
) {
}
