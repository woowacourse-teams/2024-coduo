package site.coduo.todo.domain.exception;

public class InvalidTodoSortException extends TodoException {

    public InvalidTodoSortException(final String message) {
        super(message);
    }
}
