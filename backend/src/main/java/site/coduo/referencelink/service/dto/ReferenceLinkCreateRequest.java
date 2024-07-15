package site.coduo.referencelink.service.dto;

import jakarta.validation.constraints.NotBlank;

public record ReferenceLinkCreateRequest(@NotBlank(message = "빈 url은 허용하지 않습니다.") String url) {
}
