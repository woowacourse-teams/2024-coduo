package site.coduo.websocket;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.fake.FakeWebSocketSession;
import site.coduo.fixture.PairRoomFixture;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
import site.coduo.pairroom.exception.NotFoundPairRoomSessionException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;

@SpringBootTest
class PairRoomWebSocketSessionStoreTest {

    @Autowired
    private PairRoomWebSocketSessionStore sessionStore;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @AfterEach
    void tearDown() {
        pairRoomRepository.deleteAll();
    }

    @Test
    @DisplayName("인메모리로 webSocket 세션을 추가 저장한다.")
    void store_new_web_socket_session() {
        // given
        final PairRoomEntity entity = PairRoomFixture.makeDummyEntity();
        pairRoomRepository.save(entity);

        // when
        sessionStore.addSession(entity.getAccessCode(), new FakeWebSocketSession());

        // then
        assertThat(sessionStore.hasPairRoomSessions(entity.getAccessCode())).isTrue();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "does not exist access code"})
    @DisplayName("저장되지 않은 페어룸 엑세스 코드로 웹 소켓 세션 저장 시도 시 예외를 던진다.")
    void throw_exception_when_try_to_save_does_not_exist_access_code(final String accessCode) {
        assertThatThrownBy(() -> sessionStore.addSession(accessCode, new FakeWebSocketSession()))
                .isInstanceOfAny(PairRoomNotFoundException.class, InvalidAccessCodeException.class);
    }

    @Test
    @DisplayName("엑세스 토큰으로 저장된 세션들을 불러온다.")
    void get_sessions_by_access_token() {
        // given
        final PairRoomEntity entity = PairRoomFixture.makeDummyEntity();
        pairRoomRepository.save(entity);
        sessionStore.addSession(entity.getAccessCode(), new FakeWebSocketSession());

        // when
        final boolean result = sessionStore.hasPairRoomSessions(entity.getAccessCode());

        // then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("특정 엑세스 코드로 된 세션들이 저장되어있는지 확인한다. - 참")
    void check_has_specific_sessions_in_store_true_case() {
        // given
        final PairRoomEntity entity = PairRoomFixture.makeDummyEntity();
        pairRoomRepository.save(entity);
        sessionStore.addSession(entity.getAccessCode(), new FakeWebSocketSession());

        // when
        final boolean result = sessionStore.hasPairRoomSessions(entity.getAccessCode());

        // then
        assertThat(result).isTrue();
    }

    @Test
    @Disabled
    @DisplayName("특정 엑세스 코드로 된 세션들이 저장되어있는지 확인한다. - 거짓")
    void check_has_specific_sessions_in_store_false_case() {
        // given
        final String accessCode = "does not exist";

        // when
        final boolean result = sessionStore.hasPairRoomSessions(accessCode);

        // then
        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("저장된 세션을 삭제한다.")
    void remove_sessions_by_access_code() {
        //given
        final PairRoomEntity entity = PairRoomFixture.makeDummyEntity();
        final FakeWebSocketSession session = new FakeWebSocketSession();
        pairRoomRepository.save(entity);
        sessionStore.addSession(entity.getAccessCode(), session);

        // when
        sessionStore.removeSession(entity.getAccessCode(), session);

        // then
        assertThatThrownBy(() -> sessionStore.getSessions(entity.getAccessCode()))
                .isInstanceOf(NotFoundPairRoomSessionException.class);
    }
}
