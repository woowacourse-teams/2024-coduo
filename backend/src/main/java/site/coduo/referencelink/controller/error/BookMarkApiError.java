package site.coduo.referencelink.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BookMarkApiError {

    BOOK_MARK_NOT_FOUND(HttpStatus.NOT_FOUND, "북마크 정보가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
