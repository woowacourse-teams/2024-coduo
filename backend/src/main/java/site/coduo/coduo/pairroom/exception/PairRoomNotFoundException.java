package site.coduo.coduo.pairroom.exception;

public class PairRoomNotFoundException extends PairRoomException {

    public PairRoomNotFoundException(String message) {
        super(message);
    }

    public PairRoomNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
