package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.referencelink.domain.OpenGraph;

@Schema(description = "레퍼런스 링크 응답")
public record ReferenceLinkResponse(
        @Schema(description = "레퍼런스 링크", example = "https:www.//naver.com")
        @NotBlank(message = "빈 url은 허용하지 않습니다.")
        String url,

        String title,
        String description,
        String image
) {

    public ReferenceLinkResponse(String url) {
        this(url, null, null, null);
    }

    public ReferenceLinkResponse(String url, OpenGraph openGraph) {
        this(url, openGraph.getTitle(), openGraph.getDescription(), openGraph.getImage());
    }
}
