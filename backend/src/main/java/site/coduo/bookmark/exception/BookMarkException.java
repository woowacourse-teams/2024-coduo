package site.coduo.coduo.bookmark.exception;

import site.coduo.coduo.common.exception.CoduoException;

public class BookMarkException extends CoduoException {

    public BookMarkException(final String message) {
        super(message);
    }

    public BookMarkException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
