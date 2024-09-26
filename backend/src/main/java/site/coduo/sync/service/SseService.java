package site.coduo.sync.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.timer.service.TimerService;

@Slf4j
@RequiredArgsConstructor
@Service
public class SseService {

    private final EventStreamsRegistry eventStreamsRegistry;
    private final TimerService timerService;
    private final SchedulerRegistry schedulerRegistry;

    public SseEmitter connect(final String key) {
        log.info("[Connect] 2. connect() service 메서드 시작");
        log.info("[Connect] 3. 커넥션 생성 및 보관");
        final SseEmitter emitter = eventStreamsRegistry.register(key);
        log.info("[Connect] 4. 타이머 남은 시간 조회");
        final long remainingTime = timerService.readTimerRemainingTime(key);
        // todo: SchedulerService 분리된 상수화 어떻게 할지 생각
        log.info("[Connect] 5. 남은 시간 메세지 전송");
        broadcast(key, "remaining-time", String.valueOf(remainingTime));
        log.info("[Connect] 6. 타이머 진행 확인");
        if (schedulerRegistry.isActive(key)) {
            log.info("[Connect] 6-1. 타이머 진행중임");
            broadcast(key, "timer", "running");
        }
        return emitter;
    }

    public void broadcast(final String key, final String event, final String data) {
        final EventStreams emitters = eventStreamsRegistry.findEventStreams(key);
        emitters.broadcast(event, data);
    }

    public boolean hasNoConnections(final String key) {
        return eventStreamsRegistry.hasNoStreams(key);
    }

    public void disconnectAll(final String key) {
        eventStreamsRegistry.release(key);
    }
}
