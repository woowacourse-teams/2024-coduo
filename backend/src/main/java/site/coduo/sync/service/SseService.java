package site.coduo.sync.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SseService {

    private final SseEmitterRegistry emitterRegistry;

    public SseEmitter connect(final String key) {
        SseEmitter emitter = new SseEmitter();
        emitterRegistry.add(key, emitter);

        return emitter;
    }
}
