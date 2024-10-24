package site.coduo.retrospect.exception;

public class MaxRetrospectLimitException extends RetrospectException {

    public MaxRetrospectLimitException(final String message) {
        super(message);
    }

    public MaxRetrospectLimitException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
