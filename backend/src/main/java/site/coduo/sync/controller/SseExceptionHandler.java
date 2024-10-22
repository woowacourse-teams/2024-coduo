package site.coduo.sync.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
        return buildErrorResponse(SseApiError.TIMER_START_FAILED);
    }

    @ExceptionHandler(NotFoundScheduledFutureException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundScheduledFutureException(
            final NotFoundScheduledFutureException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.TIMER_STOP_FAILED);
    }

    @ExceptionHandler(NotFoundSseConnectionException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundSseConnectionException(
            final NotFoundSseConnectionException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.CONNECTION_NOT_FOUND);
    }

    @ExceptionHandler(NotFoundTimeStampException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundTimeStampException(final NotFoundTimeStampException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.TIMER_STOP_FAILED);
    }

    @ExceptionHandler(SseConnectionDuplicationException.class)
    public ResponseEntity<ApiErrorResponse> handleSseConnectionDuplicationException(
            final SseConnectionDuplicationException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.CONNECTION_DUPLICATED);
    }

    @ExceptionHandler(SseConnectionFailureException.class)
    public ResponseEntity<ApiErrorResponse> handleSseConnectionFailureException(final SseConnectionFailureException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.CONNECTION_FAILED);
    }

    @ExceptionHandler(SyncException.class)
    public ResponseEntity<ApiErrorResponse> handleSyncException(final SyncException e) {
        log.warn(e.getMessage());
        return buildErrorResponse(SseApiError.SYNC_FAILED);
    }

    private ResponseEntity<ApiErrorResponse> buildErrorResponse(final SseApiError error) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return ResponseEntity.status(error.getHttpStatus())
                .headers(headers)
                .body(new ApiErrorResponse(error.getMessage()));
    }
}
