package site.coduo.sync.service;

import java.io.IOException;
import java.time.Duration;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import site.coduo.sync.exception.SseConnectionFailureException;

@Slf4j
@Getter
public class SseEventStream implements EventStream {

    private static final Duration TIME_OUT = Duration.ofMinutes(20);
    private static final String CLOSE_NAME = "close";
    private static final String CONNECT_NAME = "connect";
    private static final String SUCCESS_MESSAGE = "OK";

    private final AtomicLong id = new AtomicLong(0);
    private final SseEmitter sseEmitter;

    public SseEventStream() {
        this.sseEmitter = new SseEmitter(TIME_OUT.toMillis());
    }

    public SseEventStream(final Duration timeout) {
        this.sseEmitter = new SseEmitter(timeout.toMillis());
    }

    public SseEventStream(final SseEmitter sseEmitter) {
        this.sseEmitter = sseEmitter;
    }

    @Override
    public SseEmitter connect() {
        final String eventId = String.valueOf(id.incrementAndGet());
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(eventId)
                    .name(CONNECT_NAME)
                    .data(SUCCESS_MESSAGE)
                    .reconnectTime(1));
        } catch (final IOException e) {
            throw new SseConnectionFailureException("SSE 연결이 실패했습니다.");
        }
        return sseEmitter;
    }

    @Override
    public void flush(final String name, final String message) {

        final String eventId = String.valueOf(id.incrementAndGet());
        try {
            sseEmitter.send(SseEmitter.event()
                    .id(eventId)
                    .name(name)
                    .data(message)
            );
        } catch (final IOException ignored) {
        }
    }

    @Override
    public void close() {
        flush(CLOSE_NAME, SUCCESS_MESSAGE);
        sseEmitter.complete();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final SseEventStream that = (SseEventStream) o;
        return Objects.equals(sseEmitter, that.sseEmitter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sseEmitter);
    }
}
