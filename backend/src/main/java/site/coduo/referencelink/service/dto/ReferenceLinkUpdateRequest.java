package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

public record ReferenceLinkUpdateRequest(long id,
                                         @NotBlank(message = "레퍼런스 링크는 비워둘 수 없습니다.") String url) {
}
