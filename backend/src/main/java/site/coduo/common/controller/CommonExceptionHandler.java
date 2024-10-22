package site.coduo.common.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.error.CommonApiError;
import site.coduo.common.controller.response.ApiErrorResponse;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleNoResourceFoundException(
            final NoResourceFoundException e,
            final HttpHeaders headers,
            final HttpStatusCode status,
            final WebRequest request
    ) {
        log.warn(e.getMessage());

        return ResponseEntity.status(CommonApiError.DATA_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.DATA_NOT_FOUND_ERROR.getMessage()));
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException e,
            final HttpHeaders headers,
            final HttpStatusCode status,
            final WebRequest request
    ) {
        log.warn(e.getMessage());

        return ResponseEntity.status(CommonApiError.INVALID_ARGUMENT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.INVALID_ARGUMENT_ERROR.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgumentException(final IllegalArgumentException e) {
        log.warn(e.getMessage(), e);

        return ResponseEntity.status(CommonApiError.INVALID_ARGUMENT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.INVALID_ARGUMENT_ERROR.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalStateException(final IllegalStateException e) {
        log.warn(e.getMessage(), e);

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
