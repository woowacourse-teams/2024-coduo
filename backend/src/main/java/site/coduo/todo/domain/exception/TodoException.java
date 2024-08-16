package site.coduo.todo.domain.exception;

public class TodoException extends RuntimeException {

    public TodoException(final String message) {
        super(message);
    }
}
