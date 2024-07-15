package site.coduo.coduo.pairroom.exception;

public class PairRoomNotFoundException extends PairRoomException {

    public PairRoomNotFoundException(final String message) {
        super(message);
    }

    public PairRoomNotFoundException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
