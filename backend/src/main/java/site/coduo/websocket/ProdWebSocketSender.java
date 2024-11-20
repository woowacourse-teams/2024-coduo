package site.coduo.websocket;

import java.io.IOException;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class ProdWebSocketSender implements WebSocketSender {

    private final ObjectMapper objectMapper;

    @Override
    public void sendMessage(final Set<WebSocketSession> sessions, final WebSocketMessage message) {
        sessions.parallelStream().forEach(session -> sendMessage(session, message));
    }

    private void sendMessage(final WebSocketSession session, final WebSocketMessage message) {
        try {
            final TextMessage webSocketMessage = new TextMessage(objectMapper.writeValueAsString(message));
            session.sendMessage(webSocketMessage);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
