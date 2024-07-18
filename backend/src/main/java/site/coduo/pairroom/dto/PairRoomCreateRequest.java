package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 생성 요청 바디")
public record PairRoomCreateRequest(
        @Schema(description = "첫 번째 페어의 이름") String firstPair,
        @Schema(description = "두 번째 페어의 이름") String secondPair
) {
}
