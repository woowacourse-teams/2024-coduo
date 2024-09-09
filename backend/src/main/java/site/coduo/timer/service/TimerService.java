package site.coduo.timer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.timer.domain.FixedDelayScheduler;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.dto.TimerReadResponse;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TimerService {

    private final FixedDelayScheduler scheduler;
    private final TimerRepository timerRepository;
    private final PairRoomRepository pairRoomRepository;

    public TimerReadResponse readTimer(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId());
        return TimerReadResponse.of(timerEntity.getId(), timerEntity.toDomain());
    }

    @Transactional
    public void updateTimerRemainingTime(final String accessCode, final long newTimerRemainingTime) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository
                .fetchTimerByPairRoomId(pairRoomEntity.getId());
        final Timer newTimer = new Timer(pairRoomEntity.toDomain(), timerEntity.getDuration(), newTimerRemainingTime);
        timerEntity.updateTimerRemainingTime(newTimer.getRemainingTime());
    }

    @Transactional
    public void updateTimerDuration(final String accessCode, final long newTimerDuration) {
        final site.coduo.pairroom.repository.PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(
                accessCode);
        final TimerEntity timerEntity = timerRepository
                .fetchTimerByPairRoomId(pairRoomEntity.getId());
        final Timer newTimer = new Timer(pairRoomEntity.toDomain(), newTimerDuration, timerEntity.getRemainingTime());
        timerEntity.updateTimerDuration(newTimer.getDuration());
    }

    public void startTimer(final String accessCode) {
        PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        Timer timer = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId()).toDomain();
        scheduler.start(accessCode);
    }

    public void stopTimer(final String accessCode) {
        PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        Timer timer = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId()).toDomain();

        scheduler.stop();
    }
}
