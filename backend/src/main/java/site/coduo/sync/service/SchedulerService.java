package site.coduo.sync.service;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ScheduledFuture;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerRepository;

@RequiredArgsConstructor
@Component
public class SchedulerService {

    public static final Duration DELAY_SECOND = Duration.of(1, ChronoUnit.SECONDS);

    private final ThreadPoolTaskScheduler taskScheduler;
    private final SchedulerRegistry schedulerRegistry;
    private final TimestampRegistry timestampRegistry;
    private final TimerRepository timerRepository;
    private final SseService sseService;

    public void start(final String key) {
        if (!schedulerRegistry.has(key) && !timestampRegistry.has(key)) {
            final Timer timer = timerRepository.fetchTimerByAccessCode(key).toDomain();
            scheduling(key, timer);
            timestampRegistry.register(key, timer);
            return;
        }
        if (!schedulerRegistry.has(key) && timestampRegistry.has(key)) {
            final Timer timer = timestampRegistry.get(key);
            scheduling(key, timer);
        }
    }

    private void scheduling(final String key, final Timer timer) {
        final Trigger trigger = new PeriodicTrigger(DELAY_SECOND);
        final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> {
            timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
            sseService.broadcast(key, "remaining-time", String.valueOf(timer.getRemainingTime()));
        }, trigger);
        schedulerRegistry.register(key, schedule);
    }

    public void stop(final String key) {
        schedulerRegistry.release(key);
    }
}
