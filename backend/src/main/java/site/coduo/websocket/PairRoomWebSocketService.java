package site.coduo.websocket;

import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PairRoomWebSocketService {

    private final PairRoomWebSocketSessionStore pairRoomWebSocketSessionStore;
    private final WebSocketSender prodWebSocketSender;

    public void sendAllPairRoomSessions(final String pairRoomAccessCode, final WebSocketMessage message) {
        final Set<WebSocketSession> sessions = pairRoomWebSocketSessionStore.getSessions(pairRoomAccessCode);
        prodWebSocketSender.sendMessage(sessions, message);
    }

    public boolean hasNoConnections(final String pairRoomAccessCode) {
        return !pairRoomWebSocketSessionStore.hasPairRoomSessions(pairRoomAccessCode);
    }
}
