package site.coduo.timer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;
import site.coduo.timer.service.dto.TimerCreateRequest;
import site.coduo.timer.service.dto.TimerReadResponse;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TimerService {

    private final TimerRepository timerRepository;
    private final PairRoomService pairRoomService;

    @Transactional
    public void createTimer(final String accessCode, final TimerCreateRequest request) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final Timer timer = new Timer(pairRoom, request.duration(), request.remainingTime());
        timerRepository.save(new TimerEntity(timer));
    }

    public TimerReadResponse readTimer(final String accessCode) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final TimerEntity timerEntity =
                timerRepository.fetchTimerByPairRoomId(pairRoom.getId());
        return TimerReadResponse.of(timerEntity.getId(), timerEntity.toDomain());
    }

    @Transactional
    public void updateTimerRemainingTime(final String accessCode, final long newTimerRemainingTime) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository
                .fetchTimerByPairRoomId(pairRoom.getId());
        final Timer newTimer = new Timer(pairRoom, timerEntity.getDuration(), newTimerRemainingTime);
        timerEntity.updateTimerRemainingTime(newTimer.getRemainingTime());
    }

    @Transactional
    public void updateTimerDuration(final String accessCode, final long newTimerDuration) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final TimerEntity timerEntity = timerRepository
                .fetchTimerByPairRoomId(pairRoom.getId());
        final Timer newTimer = new Timer(pairRoom, newTimerDuration, timerEntity.getRemainingTime());
        timerEntity.updateTimerDuration(newTimer.getDuration());
    }
}
