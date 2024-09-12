package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import site.coduo.sync.exception.NotFoundSseConnectionException;

class EventStreamsRegistryTest {

    @Test
    @DisplayName("Emitter를 레지스트리에서 생성후 반환한다.")
    void add_emitter_to_registry() {
        // given
        final EventStreamsRegistry sut = new EventStreamsRegistry();

        // when
        final SseEmitter emitter = sut.register("hello");

        // then
        assertThat(emitter).isNotNull();
    }

    @Test
    @DisplayName("등록된 이벤트 스트림을 가져온다.")
    void return_stored_event_stream() {
        // given
        final EventStreamsRegistry eventStreamsRegistry = new EventStreamsRegistry();
        final String key = "test";
        final SseEmitter emitter = eventStreamsRegistry.register(key);

        // when & then
        assertThatCode(() -> eventStreamsRegistry.findEventStreams(key))
                .doesNotThrowAnyException();
    }


    @Test
    @DisplayName("등록되지 않은 이벤트 스트림들을 조회할 경우 예외를 발생시킨다.")
    void throw_exception_when_search_un_registered_event_stream() {
        // given
        final EventStreamsRegistry eventStreamsRegistry = new EventStreamsRegistry();
        final String key = "test";

        // when & then
        assertThatThrownBy(() -> eventStreamsRegistry.findEventStreams(key))
                .isInstanceOf(NotFoundSseConnectionException.class);
    }
}
