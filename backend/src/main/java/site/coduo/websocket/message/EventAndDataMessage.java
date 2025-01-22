package site.coduo.websocket.message;

import site.coduo.websocket.WebSocketMessage;

public record EventAndDataMessage(String event, String data) implements WebSocketMessage {
}
