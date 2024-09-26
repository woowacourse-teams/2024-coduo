package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.time.Duration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

class SseEventStreamTest {

    @Test
    @DisplayName("SSE event 처리 객체를 만든다.")
    void create_sse_object() {
        // given
        final EventStream eventStream = new SseEventStream(Duration.ZERO);

        // when
        final SseEmitter connect = eventStream.connect();

        // then
        assertThat(connect.getTimeout()).isEqualTo(Duration.ZERO.toMillis());
    }

    @Test
    @DisplayName("SSE event를 발생시킨다.")
    void generate_sse_event() throws IOException {
        // given
        final SseEmitter sseEmitter = mock(SseEmitter.class);

        final EventStream eventStream = new SseEventStream(sseEmitter);

        // when
        eventStream.flush("test", "hello");

        // then
        verify(sseEmitter, atLeastOnce()).send(any(SseEventBuilder.class));
    }
}
