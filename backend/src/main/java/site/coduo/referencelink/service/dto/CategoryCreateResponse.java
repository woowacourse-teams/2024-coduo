package site.coduo.referencelink.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.referencelink.repository.CategoryEntity;

@Schema(description = "카테고리 생성 응답")
public record CategoryCreateResponse(
        @Schema(description = "카테고리 ID")
        String id,

        @Schema(description = "카테고리 값")
        String value
) {

    public static CategoryCreateResponse from(final CategoryEntity category) {
        return new CategoryCreateResponse(String.valueOf(category.getId()), category.getCategoryName());
    }
}
