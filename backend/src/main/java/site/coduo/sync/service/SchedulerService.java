package site.coduo.sync.service;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ScheduledFuture;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.domain.TimerStatus;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.TimestampRegistry;
import site.coduo.timer.service.dto.TimerStartResponse;
import site.coduo.timer.service.dto.TimerStatusResponse;
import site.coduo.websocket.StompSubscriptionService;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Component
public class SchedulerService {

    public static final Duration DELAY_SECOND = Duration.of(1, ChronoUnit.SECONDS);

    private final SimpMessagingTemplate messagingTemplate;
    private final StompSubscriptionService stompSubscriptionService;
    private final ThreadPoolTaskScheduler taskScheduler;
    private final SchedulerRegistry schedulerRegistry;
    private final TimestampRegistry timestampRegistry;
    private final TimerRepository timerRepository;

    public void start(final String key) {
        if (schedulerRegistry.isActive(key)) {
            return;
        }
        messagingTemplate.convertAndSend(
                "/topic/" + key + "/timer/status",
                new TimerStatusResponse(TimerStatus.START.getName(), null)
        );
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
        if (stompSubscriptionService.hasSubscription("/topic/" + key + "/timer") && schedulerRegistry.has(key)) {
            pauseTimer(key);
            return;
        }
        timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
        messagingTemplate.convertAndSend(
                "/topic/" + key + "/timer",
                new TimerStartResponse(timer.getRemainingTime())
        );
    }

    private void pauseTimer(final String key) {
        if (schedulerRegistry.isActive(key)) {
            schedulerRegistry.release(key);
        }
    }

    public void pause(final String key) {
        pauseTimer(key);
        messagingTemplate.convertAndSend(
                "/topic/" + key + "/timer/status",
                new TimerStatusResponse(TimerStatus.PAUSE.getName(), null));
    }

    private void stop(final String key, final Timer timer) {
        messagingTemplate.convertAndSend(
                "/topic/" + key + "/timer/status",
                new TimerStatusResponse(TimerStatus.PAUSE.getName(), null));
        schedulerRegistry.release(key);
        final Timer initalTimer = new Timer(timer.getAccessCode(), timer.getDuration(), timer.getDuration());
        timestampRegistry.register(key, initalTimer);
    }

    public void notifyTimerStatus(final String key) {
        if (schedulerRegistry.isActive(key)) {
            messagingTemplate.convertAndSend(
                    "/topic/" + key + "/timer/status",
                    new TimerStatusResponse(TimerStatus.RUNNING.getName(), null));
        }
    }

    public void syncTimerWithDatabase(final String key) {
        if (timestampRegistry.has(key)) {
            final Timer timer = timestampRegistry.get(key);
            final TimerEntity timerEntity = timerRepository.fetchTimerByAccessCode(key);
            timerEntity.updateTimer(timer);
        }
    }
}
