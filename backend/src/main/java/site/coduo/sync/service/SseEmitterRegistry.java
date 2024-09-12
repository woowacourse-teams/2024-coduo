package site.coduo.sync.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;

@Component
public class SseEmitterRegistry {

    private final Map<String, SseEmitters> registry;

    public SseEmitterRegistry() {
        registry = new ConcurrentHashMap<>();
    }

    public int add(final String name, final SseEmitter emitter) {
        final SseEmitters sseEmitters = registry.getOrDefault(name, new SseEmitters());
        sseEmitters.add(emitter);
        registry.put(name, sseEmitters);
        return registry.size();
    }

    public SseEmitters findEmitters(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
        }
        return registry.get(key);
    }
}
