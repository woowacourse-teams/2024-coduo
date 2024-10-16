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
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
import site.coduo.pairroom.repository.PairRoomRepository;
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
    private final PairRoomRepository pairRoomRepository;

    public void start(final String key) {
        validateNotDeleted(key);
        if (schedulerRegistry.isActive(key)) {
            return;
        }
        if (isInitial(key)) {
            final Timer timer = timerRepository.fetchTimerByAccessCode(key).toDomain();
            scheduling(key, timer);
            timestampRegistry.register(key, timer);
            return;
        }
        final Timer timer = timestampRegistry.get(key);
        scheduling(key, timer);
    }

    public void validateNotDeleted(final String accessCode) {
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(accessCode).toDomain();
        if (pairRoom.isDeleted()) {
            throw new InvalidAccessCodeException("이미 삭제되어 접근이 불가능한 엑세스 코드입니다.");
        }
    }

    private boolean isInitial(final String key) {
        return !schedulerRegistry.has(key) && !timestampRegistry.has(key);
    }

    private void scheduling(final String key, final Timer timer) {
        sseService.broadcast(key, "timer", "start");
        final Trigger trigger = new PeriodicTrigger(DELAY_SECOND);
        final ScheduledFuture<?> schedule = taskScheduler.schedule(() -> runTimer(key, timer), trigger);
        schedulerRegistry.register(key, schedule);
    }

    private void runTimer(final String key, final Timer timer) {
        if (timer.isTimeUp() && schedulerRegistry.has(key)) {
            stop(key, timer);
            return;
        }
        if (sseService.hasNoConnections(key) && schedulerRegistry.has(key)) {
            pause(key);
            return;
        }
        timer.decreaseRemainingTime(DELAY_SECOND.toMillis());
        sseService.broadcast(key, "remaining-time", String.valueOf(timer.getRemainingTime()));
    }

    public void pause(final String key) {
        if (schedulerRegistry.isActive(key)) {
            sseService.broadcast(key, "timer", "pause");
            schedulerRegistry.release(key);
        }
    }

    private void stop(final String key, final Timer timer) {
        sseService.broadcast(key, "timer", "stop");
        schedulerRegistry.release(key);
        final Timer initalTimer = new Timer(timer.getAccessCode(), timer.getDuration(), timer.getDuration());
        timestampRegistry.register(key, initalTimer);
    }

    public void detach(final String key) {
        sseService.broadcast(key, "timer", "disconnect");
        schedulerRegistry.clear(key);
        sseService.disconnectAll(key);
        timestampRegistry.clear(key);
    }
}
