package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.referencelink.domain.OpenGraph;

@Schema(description = "레퍼런스 링크 응답")
public record ReferenceLinkResponse(
        @Schema(description = "레퍼런스 링크", example = "https:www.//naver.com")
        @NotBlank(message = "빈 url은 허용하지 않습니다.")
        String url,

        @Schema(description = "오픈그래프 제목", nullable = true)
        String title,

        @Schema(description = "오픈그래프 설명", nullable = true)
        String description,

        @Schema(description = "오픈그래프 이미지", nullable = true)
        String image
) {

    public ReferenceLinkResponse(final String url) {
        this(url, null, null, null);
    }

    public ReferenceLinkResponse(final String url, final OpenGraph openGraph) {
        this(url, openGraph.getTitle(), openGraph.getDescription(), openGraph.getImage());
    }
}
