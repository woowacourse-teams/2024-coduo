package site.coduo.sync.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

class SseEmitterRegistryTest {

    @Test
    @DisplayName("Emitter를 레지스트리에 등록한다.")
    void add_emitter_to_registry() {
        // given
        final SseEmitterRegistry sut = new SseEmitterRegistry();
        final SseEmitter emitter = new SseEmitter();

        // when
        final int size = sut.add("hello", emitter);

        // then
        assertThat(size).isEqualTo(1);
    }

}
