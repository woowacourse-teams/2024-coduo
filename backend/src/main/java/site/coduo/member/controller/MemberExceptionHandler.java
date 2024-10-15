package site.coduo.member.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.controller.error.MemberApiError;
import site.coduo.member.exception.AuthorizationException;
import site.coduo.member.exception.ExternalApiCallException;
import site.coduo.member.exception.MemberNotFoundException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MemberExceptionHandler {

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handlerMemberNotFoundException(final MemberNotFoundException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(MemberApiError.MEMBER_NOT_FOUND_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(MemberApiError.MEMBER_NOT_FOUND_ERROR.getMessage()));
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ApiErrorResponse> handlerAuthorizationException(final AuthorizationException e) {
        log.warn(e.getMessage());

        return ResponseEntity.status(MemberApiError.AUTHORIZATION_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(MemberApiError.AUTHENTICATION_ERROR.getMessage()));
    }

    @ExceptionHandler(ExternalApiCallException.class)
    public ResponseEntity<ApiErrorResponse> handlerExternalApiCallFailureException(final ExternalApiCallException e) {
        log.error(e.getMessage());

        return ResponseEntity.status(MemberApiError.API_CALL_FAILURE_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(MemberApiError.MEMBER_NOT_FOUND_ERROR.getMessage()));
    }
}
