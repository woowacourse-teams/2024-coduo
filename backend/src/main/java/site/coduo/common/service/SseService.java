package site.coduo.common.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoomEmitterManager;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerRepository;

@RequiredArgsConstructor
@Service
public class SseService {

    private final PairRoomEmitterManager manager;
    private final PairRoomRepository pairRoomRepository;
    private final TimerRepository timerRepository;

    public SseEmitter createConnection(final String accessCode) {
        return manager.add(new AccessCode(accessCode));
    }

    public void countDownTimer(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        final Timer timer = timerRepository.fetchTimerByPairRoomId(pairRoomEntity.getId()).toDomain();
        timer.decreaseRemainingTime(1000L);
        manager.sendTimeDuration(new AccessCode(accessCode), timer.getRemainingTime());
    }
}
