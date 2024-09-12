package site.coduo.fake;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;
import site.coduo.sync.service.SseEmitterRegistry;
import site.coduo.sync.service.SseEmitters;

public class FakeSchedulerRegistry extends SseEmitterRegistry {

    private final Map<String, SseEmitters> registry;

    public FakeSchedulerRegistry() {
        registry = new HashMap<>();
    }

    @Override
    public int add(final String name, final SseEmitter emitter) {
        final SseEmitter fakeEmitter = new SseEmitter();
        try {
            fakeEmitter.send(
                    SseEmitter.event()
                            .name("dummy")
                            .data("test")
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return super.add(name, fakeEmitter);
    }

    @Override
    public SseEmitters findEmitters(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundSseConnectionException("존재하지 않는 SSE 커넥션입니다.");
        }
        return registry.get(key);
    }
}
