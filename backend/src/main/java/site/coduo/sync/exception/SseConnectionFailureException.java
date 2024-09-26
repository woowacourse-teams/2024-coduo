package site.coduo.sync.exception;

public class SseConnectionFailureException extends SyncException {

    public SseConnectionFailureException(final String message) {
        super(message);
    }
}
