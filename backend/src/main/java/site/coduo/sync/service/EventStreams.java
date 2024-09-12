package site.coduo.sync.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.SseConnectionDuplicationException;

public class EventStreams {

    private final List<EventStream> streams = Collections.synchronizedList(new ArrayList<>());

    public SseEmitter publish(final EventStream eventStream) {
        final SseEmitter emitter = eventStream.connect();
        emitter.onTimeout(emitter::complete);
        emitter.onCompletion(() -> streams.remove(eventStream));
        return emitter;
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
}
