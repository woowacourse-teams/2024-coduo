package site.coduo.timer.domain;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Objects;
import java.util.concurrent.ScheduledFuture;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class FixedDelayScheduler {

    private static final long DECREASE_MILLISECONDS = 1000L;

    private final ThreadPoolTaskScheduler taskScheduler;
    private ScheduledFuture<?> future;

    public void start(final Timer timer) {
        final Trigger trigger = new PeriodicTrigger(Duration.of(1, ChronoUnit.SECONDS));
        if (future == null || future.isCancelled()) {
            future = taskScheduler.schedule(() -> timer.decreaseRemainingTime(1000L), trigger);
        }
    }

    public void stop(final Timer timer) {
        Objects.requireNonNull(timer, "타이머에 널값 허용하지 않습니다.");
        future.cancel(false);
    }
}
