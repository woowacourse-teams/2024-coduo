package site.coduo.fake;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;
import site.coduo.sync.service.EventStream;
import site.coduo.sync.service.EventStreams;
import site.coduo.sync.service.EventStreamsRegistry;

public class FakeEventStreamRegistry extends EventStreamsRegistry {

    private final Map<String, EventStreams> registry;

    public FakeEventStreamRegistry() {
        this.registry = new HashMap<>();
    }

    @Override
    public SseEmitter register(final String name) {
        final EventStreams eventStreams = registry.getOrDefault(name, new EventStreams());
        registry.put(name, eventStreams);
        final EventStream eventStream = new FakeEvenStream();
        eventStreams.add(eventStream);
        return eventStreams.publish(eventStream);
    }

    @Override
    public EventStreams findEventStreams(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
        }
        return registry.get(key);
    }
}
