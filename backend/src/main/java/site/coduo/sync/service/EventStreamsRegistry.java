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

    public SseEmitter register(final String key) {
        final EventStreams eventStreams = registry.getOrDefault(key, new EventStreams());
        final EventStream eventStream = new SseEventStream();
        eventStreams.add(eventStream);
        registry.put(key, eventStreams);
        return eventStreams.publish(eventStream);
    }

    public void release(final String key) {
        if (!registry.containsKey(key)) {
            return;
        }
        final EventStreams eventStreams = registry.get(key);
        eventStreams.closeAll();
        registry.remove(key);
    }

    public EventStreams findEventStreams(final String key) {
        if (registry.containsKey(key)) {
            return registry.get(key);
        }
        throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
    }

    public boolean hasNoStreams(final String key) {
        if (registry.containsKey(key)) {
            return registry.get(key).isEmpty();
        }
        throw new NotFoundSseConnectionException("SSE 커넥션을 찾을 수 없습니다.");
    }
}
