package site.coduo.fake;

import java.time.Duration;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.service.EventStream;

public class FakeEvenStream implements EventStream {

    private static final long CONNECTION_TIME_OUT_MILLISECONDS = Duration.ofMillis(500).toMillis();

    private final SseEmitter sseEmitter;

    public FakeEvenStream() {
        sseEmitter = new SseEmitter(CONNECTION_TIME_OUT_MILLISECONDS);
    }

    @Override
    public SseEmitter connect() {
        final SseEmitter sseEmitter = new SseEmitter(CONNECTION_TIME_OUT_MILLISECONDS);
        sseEmitter.onTimeout(sseEmitter::complete);
        return sseEmitter;
    }

    @Override
    public void flush(final String name, final String message) {
        sseEmitter.complete();
    }
}
