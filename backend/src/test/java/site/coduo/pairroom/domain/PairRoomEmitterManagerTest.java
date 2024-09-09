package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PairRoomEmitterManagerTest {

    @Autowired
    private PairRoomEmitterManager manager;

    @Test
    @DisplayName("AccessCode 별 새로운 Emitter를 추가한다.")
    void add_new_emitter_via_access_code() {
        // given
        final String accessCode = "some-access-code";

        // when & then
        assertThatCode(() -> manager.add(accessCode))
                .doesNotThrowAnyException();
    }
}
