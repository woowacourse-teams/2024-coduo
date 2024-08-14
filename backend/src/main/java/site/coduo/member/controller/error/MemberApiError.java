package site.coduo.member.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberApiError {
    AUTHENTICATION_ERROR(HttpStatus.UNAUTHORIZED, "인증되지 않은 접근입니다."),
    AUTHORIZATION_ERROR(HttpStatus.FORBIDDEN, "권한 밖 접근입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
