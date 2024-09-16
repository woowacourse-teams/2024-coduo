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
    private final EventStreamsRegistry eventStreamsRegistry;
    private final TimerRepository timerRepository;

    public void start(final String key) {
        final Trigger trigger = new PeriodicTrigger(DELAY_SECOND);
        final EventStreams emitters = eventStreamsRegistry.findEventStreams(key);
        if (!schedulerRegistry.has(key) && !timestampRegistry.has(key)) {
            final Timer timer = timerRepository.fetchTimerByAccessCode(key).toDomain();
            final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> {
                timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
                emitters.broadcast("remaining-time", String.valueOf(timer.getRemainingTime()));
            }, trigger);
            schedulerRegistry.register(key, schedule);
            timestampRegistry.register(key, timer);
            return;
        }
        if (!schedulerRegistry.has(key) && timestampRegistry.has(key)) {
            final Timer timer = timestampRegistry.get(key);
            final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> {
                timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
                emitters.broadcast("remaining-time", String.valueOf(timer.getRemainingTime()));
            }, trigger);
            schedulerRegistry.register(key, schedule);
        }
    }

    public void stop(final String key) {
        schedulerRegistry.release(key);
    }
}
