package site.coduo.sync.service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;
import site.coduo.sync.exception.SseConnectionDuplicationException;

@Slf4j
public class EventStreams {

    private final List<EventStream> streams = new CopyOnWriteArrayList<>();

    public SseEmitter publish(final EventStream eventStream) {
        final SseEmitter sseEmitter = eventStream.connect();
        sseEmitter.onTimeout(sseEmitter::complete);
        sseEmitter.onCompletion(() -> streams.remove(eventStream));
        sseEmitter.onError(error -> streams.remove(eventStream));
        return sseEmitter;
    }

    public void add(final EventStream eventStream) {
        if (streams.contains(eventStream)) {
            throw new SseConnectionDuplicationException("중복된 Sse Connection입니다.");
        }
        streams.add(eventStream);
    }

    public void broadcast(final String name, final String message) {
        streams.forEach(eventStream -> eventStream.flush(name, message));
    }

    public boolean isEmpty() {
        return streams.isEmpty();
    }
}
