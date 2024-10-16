package site.coduo.member.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberApiError {

    AUTHENTICATION_ERROR(HttpStatus.UNAUTHORIZED, "인증되지 않은 접근입니다."),
    AUTHORIZATION_ERROR(HttpStatus.FORBIDDEN, "권한 외 접근입니다."),
    MEMBER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    API_CALL_FAILURE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "외부 API와 상호작용 중 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
