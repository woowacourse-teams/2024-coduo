package site.coduo.todo.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.todo.controller.error.TodoApiError;
import site.coduo.todo.exception.TodoException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TodoExceptionHandler {

    @ExceptionHandler(TodoException.class)
    public ResponseEntity<ApiErrorResponse> handleTodoException(final TodoException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.INVALID_TODO_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(e.getMessage()));
    }
}
