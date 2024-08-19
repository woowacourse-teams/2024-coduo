package site.coduo.referencelink.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.referencelink.controller.error.ReferenceLinkApiError;
import site.coduo.referencelink.exception.InvalidUrlFormatException;
import site.coduo.referencelink.exception.ReferenceLinkException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ReferenceLinkErrorController {

    @ExceptionHandler(InvalidUrlFormatException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidUrlFormatException(InvalidUrlFormatException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(ReferenceLinkApiError.INVALID_URL_FORMAT.getHttpStatus())
                .body(new ApiErrorResponse(ReferenceLinkApiError.INVALID_URL_FORMAT.getMessage()));
    }

    @ExceptionHandler(ReferenceLinkException.class)
    public ResponseEntity<ApiErrorResponse> handleReferenceLinkException(final ReferenceLinkException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(ReferenceLinkApiError.BAD_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(ReferenceLinkApiError.BAD_REQUEST.getMessage()));
    }
}
