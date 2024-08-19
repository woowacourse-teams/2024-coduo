package site.coduo.todo.exception;

public class TodoNotFoundException extends TodoException {

    public TodoNotFoundException(final String message) {
        super(message);
    }
}
