package site.coduo.sync.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SseApiError {

    SYNC_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "동기화에 실패하였습니다."),
    TIMER_START_FAILED(HttpStatus.BAD_REQUEST, "타이머 실행에 실패하였습니다."),
    TIMER_STOP_FAILED(HttpStatus.BAD_REQUEST, "타이머 중지에 실패하였습니다."),
    SCHEDULER_NOT_FOUND(HttpStatus.NOT_FOUND, "스케줄러를 찾을 수 없습니다."),
    CONNECTION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "SSE 연결에 실패했습니다."),
    CONNECTION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 페어룸의 SSE 연결을 찾을 수 없습니다."),
    CONNECTION_DUPLICATED(HttpStatus.BAD_REQUEST, "해당 페어룸에 이미 연결된 SSE 연결이 존재합니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
