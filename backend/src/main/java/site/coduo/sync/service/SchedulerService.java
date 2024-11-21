package site.coduo.sync.service;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ScheduledFuture;

import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.TimestampRegistry;
import site.coduo.websocket.PairRoomWebSocketService;
import site.coduo.websocket.message.EventAndDataMessage;

@Slf4j
@RequiredArgsConstructor
@Component
public class SchedulerService {

    public static final Duration DELAY_SECOND = Duration.of(1, ChronoUnit.SECONDS);

    private final PairRoomWebSocketService pairRoomWebSocketService;
    private final ThreadPoolTaskScheduler taskScheduler;
    private final SchedulerRegistry schedulerRegistry;
    private final TimestampRegistry timestampRegistry;
    private final TimerRepository timerRepository;

    public void start(final String key) {
        if (schedulerRegistry.isActive(key)) {
            return;
        }
        pairRoomWebSocketService.sendAllPairRoomSessions(key, new EventAndDataMessage("timer", "start"));
        if (isInitial(key)) {
            final Timer timer = timerRepository.fetchTimerByAccessCode(key)
                    .toDomain();
            scheduling(key, timer);
            timestampRegistry.register(key, timer);
            return;
        }
        final Timer timer = timestampRegistry.get(key);
        scheduling(key, timer);
    }

    private boolean isInitial(final String key) {
        return !schedulerRegistry.has(key) && !timestampRegistry.has(key);
    }

    private void scheduling(final String key, final Timer timer) {
        final Trigger trigger = new PeriodicTrigger(DELAY_SECOND);
        final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> runTimer(key, timer), trigger);
        schedulerRegistry.register(key, schedule);
    }

    private void runTimer(final String key, final Timer timer) {
        if (timer.isTimeUp() && schedulerRegistry.has(key)) {
            stop(key, timer);
            return;
        }
        if (pairRoomWebSocketService.hasNoConnections(key) && schedulerRegistry.has(key)) {
            pause(key);
            return;
        }
        timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
        pairRoomWebSocketService.sendAllPairRoomSessions(key,
                new EventAndDataMessage("remaining-time", String.valueOf(timer.getRemainingTime())));
    }

    public void pause(final String key) {
        if (schedulerRegistry.isActive(key)) {
            pairRoomWebSocketService.sendAllPairRoomSessions(key, new EventAndDataMessage("timer", "pause"));
            schedulerRegistry.release(key);
        }
    }

    private void stop(final String key, final Timer timer) {
        pairRoomWebSocketService.sendAllPairRoomSessions(key, new EventAndDataMessage("timer", "stop"));
        schedulerRegistry.release(key);
        final Timer initalTimer = new Timer(timer.getAccessCode(), timer.getDuration(), timer.getDuration());
        timestampRegistry.register(key, initalTimer);
    }
}
