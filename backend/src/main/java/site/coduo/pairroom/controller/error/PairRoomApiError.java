package site.coduo.pairroom.controller.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PairRoomApiError {

    PAIR_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "페어룸이 존재하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
