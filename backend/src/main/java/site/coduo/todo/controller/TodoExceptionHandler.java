package site.coduo.todo.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.todo.controller.error.TodoApiError;
import site.coduo.todo.exception.InvalidTodoContentException;
import site.coduo.todo.exception.InvalidUpdatedTodoSortException;
import site.coduo.todo.exception.TodoException;
import site.coduo.todo.exception.TodoNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TodoExceptionHandler {

    @ExceptionHandler(InvalidTodoContentException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidTodoContentException(final InvalidTodoContentException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.INVALID_TODO_CONTENT_FORMAT.getHttpStatus())
                .body(new ApiErrorResponse(TodoApiError.INVALID_TODO_CONTENT_FORMAT.getMessage()));
    }

    @ExceptionHandler(InvalidUpdatedTodoSortException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidUpdatedTodoSortException(
            final InvalidUpdatedTodoSortException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.INVALID_TODO_SORT.getHttpStatus())
                .body(new ApiErrorResponse(TodoApiError.INVALID_TODO_SORT.getMessage()));
    }

    @ExceptionHandler(TodoNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleTodoNotFoundException(final TodoNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.TODO_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(TodoApiError.TODO_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(TodoException.class)
    public ResponseEntity<ApiErrorResponse> handleTodoException(final TodoException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.INVALID_TODO_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(TodoApiError.INVALID_TODO_REQUEST.getMessage()));
    }
}
