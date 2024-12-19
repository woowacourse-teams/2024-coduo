package site.coduo.websocket;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
import site.coduo.pairroom.exception.NotFoundPairRoomSessionException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomRepository;

@RequiredArgsConstructor
@Component
public class PairRoomWebSocketSessionStore {

    private final PairRoomRepository pairRoomRepository;
    private final Map<String, Set<WebSocketSession>> sessions = new ConcurrentHashMap<>();

    public void addSession(final String pairRoomAccessCode, final WebSocketSession session) {
        validatePairRoomAccessCode(pairRoomAccessCode);
        if (!sessions.containsKey(pairRoomAccessCode)) {
            sessions.put(pairRoomAccessCode, new HashSet<>());
        }
        sessions.get(pairRoomAccessCode).add(session);
    }

    private void validatePairRoomAccessCode(final String pairRoomAccessCode) {
        if (pairRoomAccessCode == null || pairRoomAccessCode.isBlank()) {
            throw new InvalidAccessCodeException("페어룸 접근 코드로 null이 입력될 수 없습니다.");
        }

        if (!pairRoomRepository.existsByAccessCode(pairRoomAccessCode)) {
            throw new PairRoomNotFoundException("존재하지 않는 페어룸 코드입니다. - " + pairRoomAccessCode);
        }
    }

    public Set<WebSocketSession> getSessions(final String pairRoomAccessCode) {
        validatePairRoomAccessCode(pairRoomAccessCode);
        checkSessionExists(pairRoomAccessCode);
        return sessions.get(pairRoomAccessCode);
    }

    private void checkSessionExists(final String pairRoomAccessCode) {
        if (!sessions.containsKey(pairRoomAccessCode)) {
            throw new NotFoundPairRoomSessionException("해당 페어룸의 세션이 존재하지 않습니다. - " + pairRoomAccessCode);
        }
    }

    public boolean hasPairRoomSessions(final String pairRoomAccessCode) {
        validatePairRoomAccessCode(pairRoomAccessCode);
        return sessions.containsKey(pairRoomAccessCode);
    }

    public void removeSession(final String pairRoomAccessCode, final WebSocketSession session) {
        validatePairRoomAccessCode(pairRoomAccessCode);
        checkSessionExists(pairRoomAccessCode);

        final Set<WebSocketSession> pairRoomSessions = sessions.get(pairRoomAccessCode);
        pairRoomSessions.remove(session);
        if (pairRoomSessions.isEmpty()) {
            sessions.remove(pairRoomAccessCode);
        }
    }
}
