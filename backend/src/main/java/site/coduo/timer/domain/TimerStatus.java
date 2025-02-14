package site.coduo.timer.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TimerStatus {

    START,
    PAUSE,
    STOP,
    RUNNING,
    UPDATE
}
