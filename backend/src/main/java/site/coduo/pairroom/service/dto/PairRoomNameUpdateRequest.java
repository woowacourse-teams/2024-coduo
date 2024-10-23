package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어룸 이름 변경 요청 바디")
public record PairRoomNameUpdateRequest(
        @Schema(description = "변경할 페어룸 이름", example = "파슬리와 함께한 페어룸")
        @NotBlank
        String roomName
) {
}
