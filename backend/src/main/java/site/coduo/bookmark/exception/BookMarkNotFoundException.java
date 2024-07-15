package site.coduo.bookmark.exception;

public class BookMarkNotFoundException extends BookMarkException {

    public BookMarkNotFoundException(final String message) {
        super(message);
    }

    public BookMarkNotFoundException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
