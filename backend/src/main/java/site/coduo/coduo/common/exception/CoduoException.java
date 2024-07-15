package site.coduo.coduo.common.exception;

public class CoduoException extends RuntimeException {

    public CoduoException(String message) {
        super(message);
    }

    public CoduoException(String message, Throwable cause) {
        super(message, cause);
    }
}
