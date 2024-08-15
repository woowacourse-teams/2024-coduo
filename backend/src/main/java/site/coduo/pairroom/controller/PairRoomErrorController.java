package site.coduo.pairroom.controller;

import java.util.InvalidPropertiesFormatException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.pairroom.controller.error.PairRoomApiError;
import site.coduo.pairroom.exception.InvalidNameFormatException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

@Slf4j
@RestControllerAdvice
public class PairRoomErrorController {

    @ExceptionHandler(InvalidNameFormatException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidPropertiesFormatException(
            final InvalidPropertiesFormatException e) {
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
}
