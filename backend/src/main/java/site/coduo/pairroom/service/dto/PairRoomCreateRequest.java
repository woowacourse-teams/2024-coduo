package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 생성 요청 바디")
public record PairRoomCreateRequest(
        @Schema(description = "첫 번째 페어의 이름")
        @NotBlank
        String firstPair,

        @Schema(description = "두 번째 페어의 이름")
        @NotBlank
        String secondPair,

        @Schema(description = "페어룸의 상태", example = "IN_PROGRESS")
        @NotBlank
        String status
) {
}
