package site.coduo.pairroom.infrastructure;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.pairroom.exception.SseConnectionFailureException;

public class SseEmitters {
    private final List<SseEmitter> emitters = Collections.synchronizedList(new ArrayList<>());

    public void add(final SseEmitter emitter) {
        emitters.add(emitter);
        try {
            emitter.send(SseEmitter.event()
                    .id("connect")
                    .data("연결 성공!"));
        } catch (IOException e) {
            throw new SseConnectionFailureException("SSE 연결이 실패했습니다.");
        }

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(emitter::complete);
    }
}
