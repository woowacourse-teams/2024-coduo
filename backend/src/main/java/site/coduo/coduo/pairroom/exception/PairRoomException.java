package site.coduo.coduo.pairroom.exception;

import site.coduo.coduo.common.exception.CoduoException;

public class PairRoomException extends CoduoException {

    public PairRoomException(String message) {
        super(message);
    }

    public PairRoomException(String message, Throwable cause) {
        super(message, cause);
    }
}
