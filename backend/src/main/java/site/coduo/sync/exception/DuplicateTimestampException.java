package site.coduo.sync.exception;

public class DuplicateTimestampException extends SyncException {

    public DuplicateTimestampException(final String message) {
        super(message);
    }
}
