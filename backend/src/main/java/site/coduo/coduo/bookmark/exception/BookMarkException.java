package site.coduo.coduo.bookmark.exception;

import site.coduo.coduo.common.exception.CoduoException;

public class BookMarkException extends CoduoException {

    public BookMarkException(String message) {
        super(message);
    }

    public BookMarkException(String message, Throwable cause) {
        super(message, cause);
    }
}
