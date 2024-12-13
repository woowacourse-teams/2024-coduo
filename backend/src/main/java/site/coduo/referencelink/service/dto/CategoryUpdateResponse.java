package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카테고리 수정 응답 바디")
public record CategoryUpdateResponse(
        @Schema(description = "수정된 카테고리 값", example = "스프링")
        @NotBlank(message = "빈 카테고리는 허용하지 않습니다.")
        String updatedCategoryName
) {
}
