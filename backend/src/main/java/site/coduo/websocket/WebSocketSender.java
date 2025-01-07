package site.coduo.websocket;

import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

public interface WebSocketSender {

    void sendMessage(WebSocketSession session, WebSocketMessage message);

    void sendMessage(Set<WebSocketSession> sessions, WebSocketMessage message);
}
