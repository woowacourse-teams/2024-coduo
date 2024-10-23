package site.coduo.retrospect.controller.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record FindRetrospectResponseV2(
        @Schema(description = "페어룸 접근 코드")
        String accessCode,
        @Schema(description = "첫번째 회고 답변", example = "답변1")
        String answer
) {
}
