package site.coduo.common.controller;

import org.springframework.http.ResponseEntity;
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
        log.error(e.getMessage(), e);

        return ResponseEntity.status(CommonApiError.DATA_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.DATA_NOT_FOUND_ERROR.getMessage()));
    }
}
