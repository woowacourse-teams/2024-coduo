package site.coduo.retrospect.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.retrospect.controller.error.RetrospectApiError;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;
import site.coduo.retrospect.exception.InvalidRetrospectInputValueException;
import site.coduo.retrospect.exception.InvalidRetrospectQuestionTypeException;
import site.coduo.retrospect.exception.NotRetrospectOwnerAccessException;
import site.coduo.retrospect.exception.RetrospectNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RetrospectExceptionHandler {

    @ExceptionHandler(InvalidRetrospectContentException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidRetrospectContentException(
            final InvalidRetrospectContentException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(RetrospectApiError.INVALID_RETROSPECT_CONTENT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(RetrospectApiError.INVALID_RETROSPECT_CONTENT_ERROR.getMessage()));
    }

    @ExceptionHandler(InvalidRetrospectInputValueException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidRetrospectInputValueException(
            final InvalidRetrospectInputValueException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(RetrospectApiError.INVALID_RETROSPECT_INPUT_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(RetrospectApiError.INVALID_RETROSPECT_INPUT_ERROR.getMessage()));
    }

    @ExceptionHandler(InvalidRetrospectQuestionTypeException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidRetrospectQuestionTypeException(
            final InvalidRetrospectQuestionTypeException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(RetrospectApiError.INVALID_RETROSPECT_QUESTION_TYPE_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(RetrospectApiError.INVALID_RETROSPECT_QUESTION_TYPE_ERROR.getMessage()));
    }

    @ExceptionHandler(NotRetrospectOwnerAccessException.class)
    public ResponseEntity<ApiErrorResponse> handleNotRetrospectOwnerAccessException(
            final NotRetrospectOwnerAccessException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(RetrospectApiError.NOT_RETROSPECT_OWNER_ACCESS_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(RetrospectApiError.NOT_RETROSPECT_OWNER_ACCESS_ERROR.getMessage()));
    }

    @ExceptionHandler(RetrospectNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleRetrospectNotFoundException(
            final RetrospectNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(RetrospectApiError.RETROSPECT_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(RetrospectApiError.RETROSPECT_NOT_FOUND_ERROR.getMessage()));
    }
}
