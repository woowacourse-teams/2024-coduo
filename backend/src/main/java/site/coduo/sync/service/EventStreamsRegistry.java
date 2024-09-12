package site.coduo.sync.service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;

@Component
public class EventStreamsRegistry {

    private final Map<String, EventStreams> registry;

    public EventStreamsRegistry() {
        registry = new ConcurrentHashMap<>();
    }

    public SseEmitter register(final String name) {
        final EventStreams eventStreams = registry.getOrDefault(name, new EventStreams());
        registry.put(name, eventStreams);
        final EventStream eventStream = new SseEventStream(Duration.ofMinutes(10));
        eventStreams.add(eventStream);
        return eventStreams.publish(eventStream);
    }

    public EventStreams findEventStreams(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
        }
        return registry.get(key);
    }
}
