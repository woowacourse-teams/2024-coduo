package site.coduo.pairroomhistory.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PairRoomHistoryApiError {

    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 페어룸 히스토리 요청입니다."),
    INVALID_TIMER_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 타이머 시간이 존재합니다."),
    PAIR_ROOM_HISTORY_NOT_FOUND(HttpStatus.NOT_FOUND, "페어룸 히스토리가 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
