package site.coduo.referencelink.service.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "레퍼런스 링크 생성 요청 바디")
public record ReferenceLinkCreateRequest(
        @Schema(description = "레퍼런스 링크 값", example = "https://www.naver.com")
        @NotBlank(message = "빈 url은 허용하지 않습니다.")
        String url,

        @Schema(description = "카테고리 id", example = "자바 스크립트")
        @Nullable
        Long categoryId
) {
}
