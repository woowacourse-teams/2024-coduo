package site.coduo.common.exception;

public class CoduoException extends RuntimeException {

    public CoduoException(final String message) {
        super(message);
    }

    public CoduoException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
