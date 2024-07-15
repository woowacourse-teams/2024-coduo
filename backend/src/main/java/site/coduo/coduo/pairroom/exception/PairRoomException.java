package site.coduo.coduo.pairroom.exception;

import site.coduo.coduo.common.exception.CoduoException;

public class PairRoomException extends CoduoException {

    public PairRoomException(final String message) {
        super(message);
    }

    public PairRoomException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
