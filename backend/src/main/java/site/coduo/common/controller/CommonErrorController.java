package site.coduo.common.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.error.CommonApiError;
import site.coduo.common.controller.response.ApiErrorResponse;

@Slf4j
@RestControllerAdvice
public class CommonErrorController {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleException() {
        return ResponseEntity.status(CommonApiError.SERVER_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(CommonApiError.SERVER_ERROR.getMessage()));
    }
}
