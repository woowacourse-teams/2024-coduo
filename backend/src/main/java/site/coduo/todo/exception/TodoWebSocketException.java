package site.coduo.todo.exception;

import lombok.Getter;

@Getter
public class TodoWebSocketException extends RuntimeException {

    private final String topic;

    public TodoWebSocketException(final String topic, final String message) {
        super(message);
        this.topic = topic;
    }
}
