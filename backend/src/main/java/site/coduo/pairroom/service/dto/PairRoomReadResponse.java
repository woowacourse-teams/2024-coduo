package site.coduo.pairroom.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroom.domain.PairRoom;

@Schema(description = "페어룸 조회 응답 바디")
public record PairRoomReadResponse(
        @Schema(description = "페어룸 id", example = "1")
        long id,

        @Schema(description = "첫 번째 페어의 이름", example = "해시")
        String navigator,

        @Schema(description = "두 번째 페어의 이름", example = "파슬리")
        String driver,

        @Schema(description = "페어룸의 상태", example = "IN_PROGRESS")
        String status
) {

    public static PairRoomReadResponse of(final PairRoom pairRoom, final long id) {
        return new PairRoomReadResponse(
                id,
                pairRoom.getNavigatorName(),
                pairRoom.getDriverName(),
                pairRoom.getStatus().name()
        );
    }
}
