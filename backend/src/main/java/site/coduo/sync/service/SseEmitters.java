package site.coduo.sync.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.SseConnectionFailureException;

public class SseEmitters {

    private final List<SseEmitter> emitters = Collections.synchronizedList(new ArrayList<>());

    public void add(final SseEmitter emitter) {
        emitters.add(emitter);
        try {
            emitter.send(SseEmitter.event()
                    .id("connect")
                    .data("OK"));
        } catch (IOException e) {
            throw new SseConnectionFailureException("SSE 연결이 실패했습니다.");
        }
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(emitter::complete);
    }

    public void notify(final String name, final String message) {
        emitters.forEach(emitter -> {
            try {
                emitter.send(
                        SseEmitter.event()
                                .name(name)
                                .data(message)
                );
            } catch (IOException e) {
                throw new SseConnectionFailureException("SSE 통신에 실패했습니다.");
            }
        });
    }
}
