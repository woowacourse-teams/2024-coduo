package site.coduo.common.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.error.CommonApiError;
import site.coduo.common.controller.response.ApiErrorResponse;

@Slf4j
@RestControllerAdvice
public class CommonErrorController {

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNoResourceFoundException(final NoResourceFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(CommonApiError.DATA_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.DATA_NOT_FOUND_ERROR.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleMethodArgumentNotValidException(
            final MethodArgumentNotValidException e
    ) {
        log.warn(e.getMessage());

        return ResponseEntity.status(CommonApiError.INVALID_ARGUMENT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.INVALID_ARGUMENT_ERROR.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException(final Exception e) {
        log.error(e.getMessage(), e);

        return ResponseEntity.status(CommonApiError.SERVER_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.SERVER_ERROR.getMessage()));
    }
}
