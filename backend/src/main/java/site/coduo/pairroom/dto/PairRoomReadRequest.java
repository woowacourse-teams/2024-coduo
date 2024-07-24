package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 조회 요청 바디")
public record PairRoomReadRequest(
        @Schema(description = "페어룸 접근 코드", example = "abcdef") String accessCode
) {
}
