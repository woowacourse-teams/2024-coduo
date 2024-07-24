package site.coduo.pairroom.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 삭제 요청 바디")
public record PairRoomDeleteRequest(
        @Schema(description = "페어룸 접근 코드", example = "abcdef")
        @NotBlank
        String accessCode
) {
}
