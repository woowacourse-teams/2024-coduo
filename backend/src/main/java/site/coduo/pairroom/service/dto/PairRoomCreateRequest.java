package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.Max;
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

        @Schema(description = "페어 깃허브 ID")
        String pairId,

        @Schema(description = "타이머 시간")
        @Min(value = 60000, message = "타이머 시간은 1분 이상이어야 합니다.")
        @Max(value = 99 * 60000, message = "타이머 시간은 99분 이하여야 합니다.")
        long timerDuration,

        @Schema(description = "타이머 남은 시간")
        @Min(value = 60000, message = "타이머 남은 시간은 1분 이상이어야 합니다.")
        @Max(value = 99 * 60000, message = "타이머 남은 시간은 99분 이하여야 합니다.")
        long timerRemainingTime,

        @Schema(description = "미션 리포지토리 링크. '그냥 시작할래요'로 생성하면 빈 문자열")
        @NotNull
        String missionUrl
) {
}
