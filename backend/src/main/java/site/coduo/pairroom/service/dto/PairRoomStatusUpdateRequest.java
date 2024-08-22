package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 상태 변경 요청 바디")
public record PairRoomStatusUpdateRequest(
        @Schema(description = "변경할 페어룸 상태", example = "IN_PROGRESS")
        @NotBlank
        String status
) {
}
