package site.coduo.sync.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.sync.controller.error.SseApiError;
import site.coduo.sync.exception.DuplicateTimestampException;
import site.coduo.sync.exception.NotFoundScheduledFutureException;
import site.coduo.sync.exception.NotFoundSseConnectionException;
import site.coduo.sync.exception.NotFoundTimeStampException;
import site.coduo.sync.exception.SseConnectionDuplicationException;
import site.coduo.sync.exception.SseConnectionFailureException;
import site.coduo.sync.exception.SyncException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SseExceptionHandler {

    @ExceptionHandler(DuplicateTimestampException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicateTimestampException(final DuplicateTimestampException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.TIMER_START_FAILED.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.TIMER_START_FAILED.getMessage()));
    }

    @ExceptionHandler(NotFoundScheduledFutureException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundScheduledFutureException(
            final NotFoundScheduledFutureException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.SCHEDULER_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.SCHEDULER_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(NotFoundSseConnectionException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundSseConnectionException(
            final NotFoundSseConnectionException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.CONNECTION_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.CONNECTION_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(NotFoundTimeStampException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundTimeStampException(final NotFoundTimeStampException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.TIMER_STOP_FAILED.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.TIMER_STOP_FAILED.getMessage()));
    }

    @ExceptionHandler(SseConnectionDuplicationException.class)
    public ResponseEntity<ApiErrorResponse> handleSseConnectionDuplicationException(
            final SseConnectionDuplicationException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.CONNECTION_DUPLICATED.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.CONNECTION_DUPLICATED.getMessage()));
    }

    @ExceptionHandler(SseConnectionFailureException.class)
    public ResponseEntity<ApiErrorResponse> handleSseConnectionFailureException(final SseConnectionFailureException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.CONNECTION_FAILED.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.CONNECTION_FAILED.getMessage()));
    }

    @ExceptionHandler(SyncException.class)
    public ResponseEntity<ApiErrorResponse> handleSyncException(final SyncException e) {
        log.warn(e.getMessage());
        return ResponseEntity.status(SseApiError.SYNC_FAILED.getHttpStatus())
                .body(new ApiErrorResponse(SseApiError.SYNC_FAILED.getMessage()));
    }
}
