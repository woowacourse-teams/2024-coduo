package site.coduo.todo.domain.exception;

public class TodoNotFoundException extends TodoException {

    public TodoNotFoundException(final String message) {
        super(message);
    }
}
