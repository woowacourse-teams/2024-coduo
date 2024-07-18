package site.coduo.pairroom.exception;

public class InvalidNameFormatException extends PairRoomException {

    public InvalidNameFormatException(final String message) {
        super(message);
    }

    public InvalidNameFormatException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
