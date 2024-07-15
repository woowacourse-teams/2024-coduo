package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "레퍼런스 링크 수정 요청")
public record ReferenceLinkUpdateRequest(
        @Schema(description = "레퍼런스 링크")
        @NotBlank(message = "레퍼런스 링크는 비워둘 수 없습니다.")
        String url
) {
}
