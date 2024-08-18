package site.coduo.todo.domain.exception;

import site.coduo.common.exception.CoduoException;

public class TodoException extends CoduoException {

    public TodoException(final String message) {
        super(message);
    }
}
