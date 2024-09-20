package site.coduo.fake;

import java.util.concurrent.Delayed;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FakeScheduledFuture implements ScheduledFuture<Object> {

    private boolean isCancelled = false;

    @Override
    public long getDelay(final TimeUnit unit) {
        return 0;
    }

    @Override
    public int compareTo(final Delayed o) {
        return 0;
    }

    // 반환값이 false = cancel 실패
    @Override
    public boolean cancel(final boolean mayInterruptIfRunning) {
        if (isCancelled) {
            return false;
        }
        isCancelled = true;
        return true;
    }

    @Override
    public boolean isCancelled() {
        return isCancelled;
    }

    @Override
    public boolean isDone() {
        return false;
    }

    @Override
    public Object get() throws InterruptedException, ExecutionException {
        return null;
    }

    @Override
    public Object get(final long timeout, final TimeUnit unit)
            throws InterruptedException, ExecutionException, TimeoutException {
        return null;
    }
}
