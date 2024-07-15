package site.coduo.coduo.bookmark.exception;

public class BookMarkNotFoundException extends BookMarkException {

    public BookMarkNotFoundException(String message) {
        super(message);
    }

    public BookMarkNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
