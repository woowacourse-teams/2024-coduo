package site.coduo.pairroom.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "페어 추가 요청 바디")
public record PairUpdateRequest(

        @Schema(description = "현재 페어룸 접근 코드", example = "IAM0000000-")
        @NotBlank
        String accessCode,

        @Schema(description = "추가할 페어 id", example = "myGithubId")
        @NotBlank
        String userId
) {
}
