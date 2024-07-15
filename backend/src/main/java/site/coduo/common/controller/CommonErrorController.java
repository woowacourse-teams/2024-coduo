package site.coduo.common.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.error.CommonApiError;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.referencelink.exception.ReferenceLinkNotFoundException;

@Slf4j
@RestControllerAdvice
public class CommonErrorController {

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ApiErrorResponse> handleBindException(final BindException exception) {
        log.warn(exception.getFieldErrors().get(0).getDefaultMessage());

        return ResponseEntity.status(CommonApiError.INVALID_ARGUMENT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.INVALID_ARGUMENT_ERROR.getMessage()));
    }

    @ExceptionHandler(ReferenceLinkNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleReferenceLinkNotFoundException(
            final ReferenceLinkNotFoundException exception) {
        log.warn(exception.getMessage());

        return ResponseEntity.status(CommonApiError.DATA_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.DATA_NOT_FOUND_ERROR.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(final Exception exception) {
        log.error(exception.getMessage());

        return ResponseEntity.status(CommonApiError.SERVER_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.SERVER_ERROR.getMessage()));
    }
}
