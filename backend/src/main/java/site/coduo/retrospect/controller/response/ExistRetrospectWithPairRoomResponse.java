package site.coduo.retrospect.controller.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "특정 페어룸에 특정 회고 존재 여부 응답 바디")
public record ExistRetrospectWithPairRoomResponse(
        @Schema(description = "존재 여부", example = "true")
        boolean existRetrospect
) {
}
