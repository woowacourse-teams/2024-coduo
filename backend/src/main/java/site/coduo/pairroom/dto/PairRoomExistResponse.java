package site.coduo.pairroom.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 존재 여부 응답 바디")
public record PairRoomExistResponse(
        @Schema(description = "페어룸 존재 여부", example = "true") boolean isExist
) {
}
