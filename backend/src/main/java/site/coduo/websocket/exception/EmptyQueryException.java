package site.coduo.websocket.exception;

public class EmptyQueryException extends WebSocketException {

    public EmptyQueryException(final String message) {
        super(message);
    }
}
