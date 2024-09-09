package site.coduo.fake;

import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import site.coduo.timer.domain.FixedDelayScheduler;
import site.coduo.timer.domain.Timer;

public class CallOnceScheduler extends FixedDelayScheduler {

    private static final long DECREASE_MILLISECONDS = 1000L;

    public CallOnceScheduler(final ThreadPoolTaskScheduler scheduler) {
        super(scheduler);
    }

    @Override
    public void start(final Timer timer) {
        timer.decreaseRemainingTime(DECREASE_MILLISECONDS);
    }

    @Override
    public void stop(final Timer timer) {
        timer.decreaseRemainingTime(timer.getRemainingTime());
    }
}
