package site.coduo.websocket;

import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

public interface WebSocketSender {

    void sendMessage(final Set<WebSocketSession> sessions, final WebSocketMessage message);
}
