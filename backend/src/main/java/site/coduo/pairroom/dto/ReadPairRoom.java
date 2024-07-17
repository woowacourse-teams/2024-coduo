package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.pairroom.domain.PairRoom;

@Schema(description = "페어룸 조회 응답 바디")
public record ReadPairRoom(@Schema(description = "페어룸 id") Long id,
                           @Schema(description = "페어 A의 이름") String nameA,
                           @Schema(description = "페어 B의 이름") String nameB) {

    public static ReadPairRoom from(final PairRoom pairRoom) {
        return new ReadPairRoom(pairRoom.getId(), pairRoom.getPairAName(), pairRoom.getPairBName());
    }
}
