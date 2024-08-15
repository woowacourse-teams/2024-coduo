package site.coduo.referencelink.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.referencelink.controller.error.ReferenceLinkApiError;
import site.coduo.referencelink.exception.ReferenceLinkException;

@Slf4j
@RestControllerAdvice
public class ReferenceLinkErrorController {

    @ExceptionHandler(ReferenceLinkException.class)
    public ResponseEntity<ApiErrorResponse> handleReferenceLinkException(ReferenceLinkException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(ReferenceLinkApiError.BAD_REQUEST.getHttpStatus())
                .body(new ApiErrorResponse(ReferenceLinkApiError.BAD_REQUEST.getMessage()));
    }
}
