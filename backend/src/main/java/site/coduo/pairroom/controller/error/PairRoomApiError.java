package site.coduo.pairroom.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PairRoomApiError {

    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "유효하지 않은 요청입니다."),
    PAIR_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "페어룸이 존재하지 않습니다."),
    INVALID_PROPERTIES_FORMAT(HttpStatus.BAD_REQUEST, "올바르지 않은 데이터 형식입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
