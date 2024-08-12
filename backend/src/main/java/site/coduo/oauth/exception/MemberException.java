package site.coduo.oauth.exception;

import site.coduo.common.exception.CoduoException;

public class MemberException extends CoduoException {

    public MemberException(final String message) {
        super(message);
    }

    public MemberException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
