package site.coduo.timer.exception;

public class NegativeTimeException extends TimerException{

    public NegativeTimeException(final String message) {
        super(message);
    }
}
