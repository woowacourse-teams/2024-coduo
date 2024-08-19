package site.coduo.todo.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TodoApiError {

    INVALID_TODO_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 TODO 요청입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
