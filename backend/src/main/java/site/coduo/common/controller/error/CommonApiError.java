package site.coduo.common.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonApiError {

    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 예기치 못한 문제가 발생하였습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
