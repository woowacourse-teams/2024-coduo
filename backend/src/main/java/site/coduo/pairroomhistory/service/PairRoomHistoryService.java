package site.coduo.pairroomhistory.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.domain.PairRoomHistory;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.dto.PairRoomHistoryReadResponse;
import site.coduo.pairroomhistory.dto.PairRoomHistoryUpdateRequest;
import site.coduo.pairroomhistory.repository.PairRoomHistoryEntity;
import site.coduo.pairroomhistory.repository.PairRoomHistoryRepository;

@Transactional
@RequiredArgsConstructor
@Service
public class PairRoomHistoryService {

    public static final int FIRST_ROUND = 1;

    private final PairRoomHistoryRepository pairRoomHistoryRepository;
    private final PairRoomService pairRoomService;

    public void createPairRoomHistory(final String accessCode, final PairRoomHistoryCreateRequest request) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final int timerRound = calculateTimerRound(pairRoom);

        final PairRoomHistory pairRoomHistory = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver(request.driver())
                .navigator(request.navigator())
                .timerRound(timerRound)
                .timerDuration(request.timerDuration())
                .timerRemainingTime(request.timerRemainingTime())
                .build();
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(pairRoomHistory));
    }

    private int calculateTimerRound(final PairRoom pairRoom) {
        if (pairRoom.getStatus().equals(PairRoomStatus.ONBOARDING)) {
            return FIRST_ROUND;
        }
        final PairRoomHistory latestPairRoomHistory =
                pairRoomHistoryRepository.fetchTopByPairRoomIdOrderByCreatedAtDesc(pairRoom.getId()).toDomain();
        return latestPairRoomHistory.getTimerRound() + 1;
    }

    public PairRoomHistoryReadResponse readLatestPairRoomHistory(final String accessCode) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistoryEntity pairRoomHistoryEntity =
                pairRoomHistoryRepository.fetchTopByPairRoomIdOrderByCreatedAtDesc(pairRoom.getId());
        return PairRoomHistoryReadResponse.of(pairRoomHistoryEntity.getId(), pairRoomHistoryEntity.toDomain());
    }

    public void updateTimerRemainingTimeHistory(final String accessCode, final PairRoomHistoryUpdateRequest request) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        pairRoomHistoryRepository
                .updateByPairRoomIdLatestTimerRemainingTime(pairRoom.getId(), request.timerRemainingTime());
    }
}
