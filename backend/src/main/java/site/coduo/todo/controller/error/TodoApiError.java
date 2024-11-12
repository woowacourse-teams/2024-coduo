package site.coduo.todo.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TodoApiError {

    TODO_NOT_FOUND(HttpStatus.NOT_FOUND, "투두를 찾을 수 없습니다."),
    INVALID_TODO_SORT(HttpStatus.BAD_REQUEST, "유효하지 않은 투두 순서입니다."),
    INVALID_TODO_CONTENT_FORMAT(HttpStatus.BAD_REQUEST, "유효하지 않은 투두 내용 형식입니다."),
    INVALID_TODO_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 TODO 요청입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
