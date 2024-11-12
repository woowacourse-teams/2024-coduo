package site.coduo.referencelink.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ReferenceLinkApiError {

    INVALID_URL_FORMAT(HttpStatus.BAD_REQUEST, "올바르지 않은 URL 형식입니다."),
    REFERENCE_LINK_NOT_FOUND(HttpStatus.NOT_FOUND, "링크 정보가 존재하지 않습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),
    INVALID_CATEGORY_FORMAT(HttpStatus.BAD_REQUEST, "올바르지 않은 카테고리 형식입니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 카테고리 혹은 레퍼런스 링크 요청입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
