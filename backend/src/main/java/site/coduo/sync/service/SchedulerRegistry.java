package site.coduo.sync.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

import org.springframework.stereotype.Component;

import site.coduo.sync.exception.NotFoundScheduledFutureException;

@Component
public class SchedulerRegistry {

    private final Map<String, ScheduledFuture<?>> registry;

    public SchedulerRegistry() {
        registry = new ConcurrentHashMap<>();
    }

    public void register(final String key, final ScheduledFuture<?> future) {
        registry.put(key, future);
    }

    public void release(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundScheduledFutureException("키에 해당하는 스케줄러 결과가 존재하지 않습니다.");
        }
        registry.get(key).cancel(false);
        registry.remove(key);
    }

    public boolean has(final String key) {
        return registry.containsKey(key);
    }
}
