package site.coduo.retrospect.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RetrospectApiError {

    INVALID_RETROSPECT_CONTENT_ERROR(HttpStatus.BAD_REQUEST, "잘못된 회고 내용입니다."),
    INVALID_RETROSPECT_QUESTION_TYPE_ERROR(HttpStatus.BAD_REQUEST, "잘못된 회고 질문 유형입니다."),
    INVALID_RETROSPECT_INPUT_ERROR(HttpStatus.BAD_REQUEST, "잘못된 회고 입력 값입니다."),
    NOT_RETROSPECT_OWNER_ACCESS_ERROR(HttpStatus.FORBIDDEN, "회고 소유자 외 접근할 수 없는 작업입니다."),
    RETROSPECT_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 요청의 회고가 존재하지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
