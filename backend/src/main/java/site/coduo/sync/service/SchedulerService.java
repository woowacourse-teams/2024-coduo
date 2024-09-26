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

@Slf4j
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
        log.info("[Timer] 2. 타이머 시작 메시지 전송.");
        sseService.broadcast(key, "timer", "start");
        if (isInitial(key)) {
            log.info("[Timer] 2-1. 타이머가 한 번도 시작되지 않음.");
            log.info("[Timer] 2-2. DB에서 타이머 가저옴");
            final Timer timer = timerRepository.fetchTimerByAccessCode(key)
                    .toDomain();
            log.info("[Timer] 2-3. 스케줄링 시작");
            scheduling(key, timer);
            log.info("[Timer] 7. register() 시작!!!!!");
            timestampRegistry.register(key, timer);
            return;
        }
        log.info("[Timer] 8. 타이머를 시작한 사람이 이미 존재한다.");
        final Timer timer = timestampRegistry.get(key);
        log.info("[Timer] 8-1. 스케줄링을 시작한다.");
        scheduling(key, timer);
    }

    private boolean isInitial(final String key) {
        return !schedulerRegistry.has(key) && !timestampRegistry.has(key);
    }

    private void scheduling(final String key, final Timer timer) {
        log.info("[Timer] 3. 시간 전송 시작!");
        final Trigger trigger = new PeriodicTrigger(DELAY_SECOND);
        final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> runTimer(key, timer), trigger);
        schedulerRegistry.register(key, schedule);
        log.info("[Timer] 6. 스케줄링 끝!!");
    }

    private void runTimer(final String key, final Timer timer) {
        log.info("[Timer] 4. 1초씩 전송!!");
        if (timer.isTimeUp()) {
            log.info("[Timer] 4-1. 타이머 끝!!");
            stop(key);
            final Timer initalTimer = new Timer(timer.getAccessCode(), timer.getDuration(), timer.getDuration());
            timestampRegistry.register(key, initalTimer);
            return;
        }
        if (sseService.hasNoConnections(key)) {
            stop(key);
            return;
        }
        timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
        sseService.broadcast(key, "remaining-time", String.valueOf(timer.getRemainingTime()));
        log.info("[Timer] 5. 타이머 끝!!, 남은 시간 : {}", timer.getRemainingTime());
    }

    public void pause(final String key) {
        sseService.broadcast(key, "timer", "pause");
        schedulerRegistry.release(key);
    }

    public void stop(final String key) {
        sseService.broadcast(key, "timer", "stop");
        schedulerRegistry.release(key);
    }
}
