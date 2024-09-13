package site.coduo.pairroomhistory.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.pairroomhistory.controller.error.PairRoomHistoryApiError;
import site.coduo.pairroomhistory.exception.InvalidTimerException;
import site.coduo.pairroomhistory.exception.PairRoomHistoryException;
import site.coduo.pairroomhistory.exception.PairRoomHistoryNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class PairRoomHistoryExceptionHandler {

    @ExceptionHandler(PairRoomHistoryNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomNotFoundException(final PairRoomHistoryNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomHistoryApiError.PAIR_ROOM_HISTORY_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomHistoryApiError.PAIR_ROOM_HISTORY_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(InvalidTimerException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidTimerException(final InvalidTimerException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomHistoryApiError.INVALID_TIMER_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomHistoryApiError.INVALID_TIMER_REQUEST.getMessage()));
    }

    @ExceptionHandler(PairRoomHistoryException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomHistoryException(final PairRoomHistoryException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomHistoryApiError.INVALID_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomHistoryApiError.INVALID_REQUEST.getMessage()));
    }
}
