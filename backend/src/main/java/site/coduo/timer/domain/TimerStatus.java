package site.coduo.timer.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TimerStatus {

    START("start"),
    PAUSE("pause"),
    STOP("stop"),
    RUNNING("running"),
    UPDATE("update");

    private final String name;
}
