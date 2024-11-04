package site.coduo.retrospect.exception;

public class RetrospectException extends RuntimeException {

    public RetrospectException(final String message) {
        super(message);
    }

    public RetrospectException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
