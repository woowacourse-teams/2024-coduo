package site.coduo.fake;

import java.io.IOException;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.pairroom.domain.PairRoomEmitterManager;
import site.coduo.pairroom.exception.SseConnectionFailureException;

public class FakeEmitterManager extends PairRoomEmitterManager {

    @Override
    public SseEmitter add(final String identifier) {
        final SseEmitter emitter = new SseEmitter(1000L);
        sentDummy(emitter);

        return emitter;
    }

    private void sentDummy(final SseEmitter emitter) {
        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connect successful"));
        } catch (IOException e) {
            throw new SseConnectionFailureException("SSE 연결에 실패했습니다.");
        }
    }
}
