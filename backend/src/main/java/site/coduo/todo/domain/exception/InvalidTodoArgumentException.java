package site.coduo.todo.domain.exception;

public class InvalidTodoArgumentException extends TodoException{

    public InvalidTodoArgumentException(final String message) {
        super(message);
    }
}
