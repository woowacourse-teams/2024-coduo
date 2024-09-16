package site.coduo.sync.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SseService {

    private final EventStreamsRegistry eventStreamsRegistry;

    public SseEmitter connect(final String key) {
        return eventStreamsRegistry.register(key);
    }

    public void broadcast(final String key, final String event, final String data) {
        final EventStreams emitters = eventStreamsRegistry.findEventStreams(key);
        emitters.broadcast(event, data);
    }
}
