package site.coduo.member.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.controller.error.MemberApiError;
import site.coduo.member.exception.AuthenticationException;
import site.coduo.member.exception.AuthorizationException;

@Slf4j
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MemberExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationException(final AuthenticationException e) {
        log.warn("인증 예외: {}", e.getMessage());

        return ResponseEntity.status(MemberApiError.AUTHENTICATION_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(MemberApiError.AUTHENTICATION_ERROR.getMessage()));
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthorizationException(final AuthorizationException e) {
        log.warn("인가 예외: {}", e.getMessage());

        return ResponseEntity.status(MemberApiError.AUTHORIZATION_ERROR.getHttpStatus())
                .body(new ApiErrorResponse(MemberApiError.AUTHORIZATION_ERROR.getMessage()));
    }
}
