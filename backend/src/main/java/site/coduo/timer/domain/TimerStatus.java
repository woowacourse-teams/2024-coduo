package site.coduo.timer.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TimerStatus {

    START("START"),
    PAUSE("PAUSE"),
    STOP("STOP"),
    RUNNING("RUNNING"),
    UPDATE("UPDATE");

    private final String message;
}
