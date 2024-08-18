package site.coduo.todo.domain.exception;

public class InvalidTodoContentException extends TodoException {

    public InvalidTodoContentException(final String message) {
        super(message);
    }
}
