package site.coduo.sync.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import site.coduo.sync.exception.DuplicateTimestampException;
import site.coduo.sync.exception.NotFoundTimeStampException;
import site.coduo.timer.domain.Timer;

@Component
@NoArgsConstructor
public class TimestampRegistry {

    private final Map<String, Timer> registry = new ConcurrentHashMap<>();

    public void register(final String key, final Timer timer) {
        if (registry.containsKey(key)) {
            throw new DuplicateTimestampException("이미 존재하는 타임 스탬프입니다.");
        }
        registry.put(key, timer);
    }

    public void release(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundTimeStampException("키에 해당하는 타임 스탬프 결과가 존재하지 않습니다.");
        }
        registry.remove(key);
    }

    public boolean has(final String key) {
        return registry.containsKey(key);
    }

    public Timer get(final String key) {
        if (!registry.containsKey(key)) {
            throw new NotFoundTimeStampException("키에 해당하는 타임 스탬프 결과가 존재하지 않습니다.");
        }
        return registry.get(key);
    }
}
