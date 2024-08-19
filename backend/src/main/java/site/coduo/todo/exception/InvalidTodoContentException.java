package site.coduo.todo.exception;

public class InvalidTodoContentException extends TodoException {

    public InvalidTodoContentException(final String message) {
        super(message);
    }
}
