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
        final SseEmitter emitter = eventStreamsRegistry.register(key);
        final long remainingTime = timerService.readTimerRemainingTime(key);
        broadcast(key, "remaining-time", String.valueOf(remainingTime));
        if (schedulerRegistry.isActive(key)) {
            broadcast(key, "timer", "running");
        }
        return emitter;
    }

    public void broadcast(final String key, final String event, final String data) {
        if (eventStreamsRegistry.hasNoStreams(key)) {
            return;
        }
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
