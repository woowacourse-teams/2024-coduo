package site.coduo.pairroom.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 생성 응답 바디")
public record PairRoomCreateResponse(
        @Schema(description = "페어룸 접근 코드", example = "abcdef") String accessCode
) {
}
