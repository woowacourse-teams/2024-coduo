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
}
