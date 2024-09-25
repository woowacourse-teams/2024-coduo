package site.coduo.sync.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;

@Component
public class EventStreamsRegistry {

    private final Map<String, EventStreams> registry;

    public EventStreamsRegistry() {
        this.registry = new ConcurrentHashMap<>();
    }

    public SseEmitter register(final String name) {
        final EventStreams eventStreams = registry.getOrDefault(name, new EventStreams());
        final EventStream eventStream = new SseEventStream();
        eventStreams.add(eventStream);
        registry.put(name, eventStreams);
        return eventStreams.publish(eventStream);
    }

    public EventStreams findEventStreams(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
        }
        return registry.get(key);
    }

    public boolean hasNoStreams(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("SSE 커넥션을 찾을 수 없습니다.");
        }
        return registry.get(key).isEmpty();
    }
}
