package site.coduo.common.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import site.coduo.common.controller.error.CommonApiError;
import site.coduo.common.controller.response.ApiErrorResponse;

@RestControllerAdvice
public class CommonErrorController {

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleNoResourceFoundException(NoResourceFoundException e) {
        return ResponseEntity.status(CommonApiError.DATA_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.DATA_NOT_FOUND_ERROR.getMessage()));
    }
}
