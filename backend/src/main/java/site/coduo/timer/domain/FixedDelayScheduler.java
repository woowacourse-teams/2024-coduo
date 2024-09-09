package site.coduo.timer.domain;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ScheduledFuture;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import site.coduo.common.service.SseService;

@RequiredArgsConstructor
@Component
public class FixedDelayScheduler {

    private final SseService sseService;
    private final ThreadPoolTaskScheduler taskScheduler;
    private ScheduledFuture<?> future;

    public void start(final String accessCode) {
        final Trigger trigger = new PeriodicTrigger(Duration.of(1, ChronoUnit.SECONDS));
        if (future == null || future.isCancelled()) {
            future = taskScheduler.schedule(() -> sseService.countDownTimer(accessCode), trigger);
        }
    }

    public void stop() {
        future.cancel(false);
    }
}
