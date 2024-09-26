package site.coduo.sync.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EventStream {

    SseEmitter connect();

    void flush(String name, String message);

    void close();
}
