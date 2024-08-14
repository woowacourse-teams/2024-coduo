package site.coduo.pairroom.dto;

import java.time.LocalTime;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroom.domain.PairRoom;

@Schema(description = "페어룸 조회 응답 바디")
public record PairRoomReadResponse(
        @Schema(description = "페어룸 id") long id,
        @Schema(description = "첫 번째 페어의 이름") String firstPair,
        @Schema(description = "두 번째 페어의 이름") String secondPair,
        @Schema(description = "타이머 시간") LocalTime timerDuration
) {

    public static PairRoomReadResponse from(final PairRoom pairRoom) {
        return new PairRoomReadResponse(
                pairRoom.getId(),
                pairRoom.getPair().getFirstPair().getValue(),
                pairRoom.getPair().getSecondPair().getValue(),
                pairRoom.getTimerDuration()
        );
    }
}
