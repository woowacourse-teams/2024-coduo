package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.referencelink.domain.OpenGraph;
import site.coduo.referencelink.repository.ReferenceLinkEntity;

@Schema(description = "레퍼런스 링크 응답")
public record ReferenceLinkResponse(
        @Schema(description = "레퍼런스 링크 id", example = "1", nullable = false)
        long id,

        @Schema(description = "레퍼런스 링크", example = "https://www.naver.com")
        @NotBlank(message = "빈 url은 허용하지 않습니다.")
        String url,

        @Schema(description = "탭 이름",
                example = "NAVER",
                nullable = false,
                defaultValue = "\"\"")
        String headTitle,

        @Schema(description = "오픈그래프 제목",
                example = "네이버",
                nullable = false,
                defaultValue = "\"\"")
        String openGraphTitle,

        @Schema(description = "오픈그래프 설명",
                example = "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
                nullable = false,
                defaultValue = "\"\"")
        String description,

        @Schema(description = "오픈그래프 이미지",
                example = "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
                nullable = false,
                defaultValue = "\"\"")
        String image
) {

    public ReferenceLinkResponse(final ReferenceLinkEntity referenceLinkEntity, final OpenGraph openGraph) {
        this(referenceLinkEntity.getId(),
                referenceLinkEntity.getUrl(),
                openGraph.getHeadTitle(),
                openGraph.getOpenGraphTitle(),
                openGraph.getDescription(),
                openGraph.getImage()
        );
    }
}
