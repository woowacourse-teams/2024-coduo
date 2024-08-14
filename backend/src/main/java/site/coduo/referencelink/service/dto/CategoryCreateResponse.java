package site.coduo.referencelink.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "카테고리 생성 응답")
public record CategoryCreateResponse(

        @Schema(description = "카테고리 ID")
        Long id,

        @Schema(description = "카테고리 값")
        String value
) {
}
