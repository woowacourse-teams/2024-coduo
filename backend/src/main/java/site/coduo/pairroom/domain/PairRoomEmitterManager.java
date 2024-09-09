package site.coduo.pairroom.domain;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.NotFoundSseConnectionException;
import site.coduo.pairroom.exception.SseConnectionFailureException;
import site.coduo.pairroom.infrastructure.SseEmitters;

@Component
public class PairRoomEmitterManager {

    private final Map<AccessCode, SseEmitters> pairRoomEmitters = new ConcurrentHashMap<>();

    public SseEmitter add(final AccessCode accessCode) {
        final SseEmitters emitters = pairRoomEmitters.getOrDefault(accessCode, new SseEmitters());
        final SseEmitter emitter = new SseEmitter(Duration.ofMinutes(10).toMillis());
        sentDummy(emitter);
        emitters.add(emitter);
        pairRoomEmitters.put(accessCode, emitters);
        return emitter;
    }

    public void sendTimeDuration(final AccessCode accessCode, final long remainingTime) {
        if (!pairRoomEmitters.containsKey(accessCode)) {
            throw new NotFoundSseConnectionException("accessCode에 대한 SSE connection이 존재하지 않습니다.");
        }
        SseEmitters emitters = pairRoomEmitters.get(accessCode);
        emitters.notify("remain time", String.valueOf(remainingTime));
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
