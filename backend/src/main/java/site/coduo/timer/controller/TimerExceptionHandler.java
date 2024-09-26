package site.coduo.timer.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.timer.controller.error.TimerApiError;
import site.coduo.timer.exception.InvalidTimerException;
import site.coduo.timer.exception.TimerException;
import site.coduo.timer.exception.TimerNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TimerExceptionHandler {

    @ExceptionHandler(TimerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomNotFoundException(final TimerNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TimerApiError.TIMER_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(TimerApiError.TIMER_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(InvalidTimerException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidTimerException(final InvalidTimerException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TimerApiError.INVALID_TIMER_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(TimerApiError.INVALID_TIMER_REQUEST.getMessage()));
    }

    @ExceptionHandler(TimerException.class)
    public ResponseEntity<ApiErrorResponse> handleTimerException(final TimerException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(TimerApiError.INVALID_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(TimerApiError.INVALID_REQUEST.getMessage()));
    }
}
