package site.coduo.member.controller;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.controller.error.MemberApiError;
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
}
