package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.io.IOException;
import java.time.Duration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter.SseEventBuilder;

import site.coduo.sync.exception.SseConnectionDuplicationException;

class EventStreamsTest {

    @Test
    @DisplayName("새로운 Event Stream을 발행한다.")
    void publish_new_event_stream_connection() {
        // given
        final EventStreams eventStreams = new EventStreams();
        final EventStream eventStream = new SseEventStream(Duration.ZERO);

        // when
        final SseEmitter publish = eventStreams.publish(eventStream);

        // then
        assertThat(eventStream).isEqualTo(new SseEventStream(publish));
    }

    @Test
    @DisplayName("커넥션을 추가한다.")
    void add_sse_connection() {
        // given
        final EventStreams eventStreams = new EventStreams();
        final EventStream eventStream = new SseEventStream(Duration.ZERO);

        // when & then
        assertThatCode(() -> eventStreams.add(eventStream))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("같은 커넥션을 두번이상 추가할 시 예외를 던진다.")
    void throw_exception_when_add_same_sse_connection_greater_equal_then_2() {
        // given
        final EventStreams eventStreams = new EventStreams();
        final EventStream eventStream = new SseEventStream(Duration.ZERO);
        eventStreams.add(eventStream);

        // when & then
        assertThatThrownBy(() -> eventStreams.add(eventStream))
                .isInstanceOf(SseConnectionDuplicationException.class);
    }

    @Test
    @DisplayName("가지고 있는 모든 이벤트 스트림으로 메세지를 브로드캐스팅한다.")
    void broadcast_entire_event_stream_that_it_has() throws IOException {
        // given
        final SseEmitter emitter1 = mock(SseEmitter.class);
        final SseEmitter emitter2 = mock(SseEmitter.class);
        final SseEmitter emitter3 = mock(SseEmitter.class);
        final EventStreams eventStreams = new EventStreams();
        final EventStream eventStream1 = new SseEventStream(emitter1);
        final EventStream eventStream2 = new SseEventStream(emitter2);
        final EventStream eventStream3 = new SseEventStream(emitter3);
        eventStreams.add(eventStream1);
        eventStreams.add(eventStream2);
        eventStreams.add(eventStream3);

        // when
        eventStreams.broadcast("hello", "test");

        // then
        verify(emitter1, times(1))
                .send(any(SseEventBuilder.class));
        verify(emitter2, times(1))
                .send(any(SseEventBuilder.class));
        verify(emitter3, times(1))
                .send(any(SseEventBuilder.class));
    }
}
