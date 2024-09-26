package site.coduo.timer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.sync.service.TimestampRegistry;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TimerService {

    private final TimerRepository timerRepository;
    private final TimestampRegistry timestampRegistry;
    private final PairRoomRepository pairRoomRepository;

    public TimerReadResponse readTimer(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId());
        return TimerReadResponse.of(timerEntity.getId(), timerEntity.toDomain());
    }

    public long readTimerRemainingTime(final String accessCode) {
        if (timestampRegistry.has(accessCode)) {
            return timestampRegistry.get(accessCode)
                    .getRemainingTime();
        }
        final Timer timer = timerRepository.fetchTimerByAccessCode(accessCode)
                .toDomain();
        return timer.getDuration();
    }

    @Transactional
    public void updateTimer(final String accessCode, final TimerUpdateRequest newTimer) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId());
        final Timer timer = new Timer(
                new AccessCode(pairRoomEntity.getAccessCode()),
                newTimer.duration(),
                newTimer.remainingTime()
        );
        timerEntity.updateTimer(timer);
    }
}
