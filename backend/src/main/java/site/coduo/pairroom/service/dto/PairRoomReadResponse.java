package site.coduo.pairroom.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.timer.domain.Timer;

@Schema(description = "페어룸 조회 응답 바디")
public record PairRoomReadResponse(
        @Schema(description = "첫 번째 페어의 이름", example = "해시")
        String navigator,

        @Schema(description = "두 번째 페어의 이름", example = "파슬리")
        String driver,

        @Schema(description = "페어룸의 상태", example = "IN_PROGRESS")
        String status,

        @Schema(description = "타이머 시간 (millisecond 기준)", example = "10000")
        long duration,

        @Schema(description = "타이머 남은 시간 (millisecond 기준)", example = "5000")
        long remainingTime
) {

    public static PairRoomReadResponse of(final PairRoom pairRoom, final Timer timer) {
        return new PairRoomReadResponse(
                pairRoom.getNavigatorName(),
                pairRoom.getDriverName(),
                pairRoom.getStatus().name(),
                timer.getDuration(),
                timer.getRemainingTime()
        );
    }
}
