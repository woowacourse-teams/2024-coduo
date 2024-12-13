package site.coduo.todo.exception;

public class InvalidTodoArgumentException extends TodoException {

    public InvalidTodoArgumentException(final String message) {
        super(message);
    }
}
