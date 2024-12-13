package site.coduo.member.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberApiError {

    AUTHENTICATION_ERROR(HttpStatus.UNAUTHORIZED, "인증되지 않은 접근입니다."),
    MEMBER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    INVALID_ADD_MEMBER_ERROR(HttpStatus.BAD_REQUEST, "자신의 아이디로 페어 정보 연동을 할 수 없습니다."),
    API_CALL_FAILURE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "외부 API와 상호작용 중 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
