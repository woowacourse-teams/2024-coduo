package site.coduo.pairroom.controller;

import java.util.InvalidPropertiesFormatException;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.pairroom.controller.error.PairRoomApiError;
import site.coduo.pairroom.exception.DuplicatePairNameException;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
import site.coduo.pairroom.exception.InvalidNameFormatException;
import site.coduo.pairroom.exception.InvalidPairRoomStatusException;
import site.coduo.pairroom.exception.OperateNotAllowedException;
import site.coduo.pairroom.exception.PairRoomException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class PairRoomExceptionHandler {

    @ExceptionHandler(DuplicatePairNameException.class)
    public ResponseEntity<ApiErrorResponse> handleDuplicatePairNameException(final DuplicatePairNameException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.INVALID_PAIR_NAME.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.INVALID_PAIR_NAME.getMessage()));
    }

    @ExceptionHandler(InvalidAccessCodeException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidAccessCodeException(final InvalidAccessCodeException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.INVALID_ACCESS_CODE.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.INVALID_ACCESS_CODE.getMessage()));
    }

    @ExceptionHandler(InvalidNameFormatException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPropertiesFormatException(
            final InvalidPropertiesFormatException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.INVALID_PROPERTIES_FORMAT.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.INVALID_PROPERTIES_FORMAT.getMessage()));
    }

    @ExceptionHandler(InvalidPairRoomStatusException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomStatusNotFoundException(
            final InvalidPairRoomStatusException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.INVALID_PROPERTIES_FORMAT.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.INVALID_PROPERTIES_FORMAT.getMessage()));
    }

    @ExceptionHandler(PairRoomNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomNotFoundException(final PairRoomNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.PAIR_ROOM_NOT_FOUND.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.PAIR_ROOM_NOT_FOUND.getMessage()));
    }

    @ExceptionHandler(OperateNotAllowedException.class)
    public ResponseEntity<ApiErrorResponse> handleOperateNotAllowedException(final OperateNotAllowedException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.NOT_OPERATE_PAIR_ROOM.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.NOT_OPERATE_PAIR_ROOM.getMessage()));
    }

    @ExceptionHandler(PairRoomException.class)
    public ResponseEntity<ApiErrorResponse> handlePairRoomException(final PairRoomException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(PairRoomApiError.INVALID_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(PairRoomApiError.INVALID_REQUEST.getMessage()));
    }
}
