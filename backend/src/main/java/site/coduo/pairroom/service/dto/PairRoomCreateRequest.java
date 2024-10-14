package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 생성 요청 바디")
public record PairRoomCreateRequest(
        @Schema(description = "내비게이터 이름")
        @NotBlank
        String navigator,

        @Schema(description = "드라이버 이름")
        @NotBlank
        String driver,

        @Schema(description = "타이머 시간")
        @Min(value = 1, message = "타이머 시간은 0보다 커야합니다.")
        long timerDuration,

        @Schema(description = "타이머 남은 시간")
        @Min(value = 1, message = "타이머 남은 시간은 0보다 커야합니다.")
        long timerRemainingTime,

        @Schema(description = "미션 리포지토리 링크. '그냥 시작할래요'로 생성하면 빈 문자열")
        @NotNull
        String missionUrl,

        @Schema(description = "페어룸의 상태", example = "IN_PROGRESS")
        @NotBlank
        String status
) {
}
