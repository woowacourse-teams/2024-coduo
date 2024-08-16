package site.coduo.pairroomhistory.dto;

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

        @Schema(description = "타이머가 몇 번 반복되었는지 나타내는 타이머 라운드", example = "1")
        @NotNull
        int timerRound,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준으로 저장한다.", example = "60000")
        @NotNull
        long timerRemainingTime
) {
}
