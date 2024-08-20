package site.coduo.pairroomhistory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroomhistory.domain.PairRoomHistory;

@Schema(description = "페어룸 히스토리 조회 응답 바디")
public record PairRoomHistoryReadResponse(
        @Schema(description = "페어룸 히스토리 식별자", example = "1")
        @NotNull
        long id,

        @Schema(description = "드라이버 이름", example = "파란")
        @NotBlank
        String driver,

        @Schema(description = "네비게이터 이름", example = "파슬리")
        @NotBlank
        String navigator,

        @Schema(description = "타이머가 몇 번 반복되었는지 나타내는 타이머 라운드", example = "1")
        @NotNull
        int timerRound,

        @Schema(description = "타이머 시간. 시간은 millisecond 기준이다.", example = "100000")
        @NotNull
        long timerDuration,

        @Schema(description = "타이머가 종료되기까지 남은 시간. 시간은 millisecond 기준이다.", example = "60000")
        @NotNull
        long timerRemainingTime
) {

    public static PairRoomHistoryReadResponse of(final long id, final PairRoomHistory pairRoomHistory) {
        return new PairRoomHistoryReadResponse(
                id,
                pairRoomHistory.getDriver(),
                pairRoomHistory.getNavigator(),
                pairRoomHistory.getTimerRound(),
                pairRoomHistory.getTimerDuration(),
                pairRoomHistory.getTimerRemainingTime()
        );
    }
}
