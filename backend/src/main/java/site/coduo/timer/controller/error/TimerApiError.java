package site.coduo.timer.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TimerApiError {

    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 요청입니다."),
    INVALID_TIMER_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 타이머 시간이 존재합니다."),
    TIMER_NOT_FOUND(HttpStatus.NOT_FOUND, "타이머를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
