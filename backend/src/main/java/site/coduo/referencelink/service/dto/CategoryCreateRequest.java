package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카테고리 생성 요청 바디")
public record CategoryCreateRequest(
        @Schema(description = "카테고리 값", example = "스프링")
        @NotBlank(message = "빈 카테고리는 허용하지 않습니다.")
        String value
) {
}
