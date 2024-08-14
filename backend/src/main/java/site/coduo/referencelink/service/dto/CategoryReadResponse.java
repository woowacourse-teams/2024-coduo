package site.coduo.referencelink.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.referencelink.repository.CategoryEntity;

@Schema(description = "카테고리 조회 응답")
public record CategoryReadResponse(

        @Schema(description = "카테고리 ID", example = "0")
        Long id,

        @Schema(description = "카테고리 값", example = "카테고리 없음")
        String value
) {

    public static CategoryReadResponse from(final CategoryEntity category) {
        return new CategoryReadResponse(category.getId(), category.getCategoryName());
    }
}
