package site.coduo.todo.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.todo.controller.error.TodoApiError;
import site.coduo.todo.exception.TodoException;
import site.coduo.todo.exception.TodoWebSocketException;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TodoExceptionHandler {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @ExceptionHandler(TodoException.class)
    public ResponseEntity<ApiErrorResponse> handleTodoException(final TodoException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TodoApiError.INVALID_TODO_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(e.getMessage()));
    }

    @MessageExceptionHandler(TodoWebSocketException.class)
    public void handleTodoWebSocketException(final TodoWebSocketException e) {
        log.warn(e.getMessage());

        simpMessagingTemplate.convertAndSend(e.getTopic(), e.getMessage());
    }
}
