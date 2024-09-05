package site.coduo.pairroomhistory.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.domain.PairRoomHistory;
import site.coduo.pairroomhistory.repository.PairRoomHistoryEntity;
import site.coduo.pairroomhistory.repository.PairRoomHistoryRepository;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryReadResponse;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PairRoomHistoryService {

    private final PairRoomHistoryRepository pairRoomHistoryRepository;
    private final PairRoomService pairRoomService;

    @Transactional
    public void createPairRoomHistory(final String accessCode, final PairRoomHistoryCreateRequest request) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistory pairRoomHistory = new PairRoomHistory(pairRoom, request.timerDuration(), request.timerRemainingTime());
        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(pairRoomHistory));
    }

    public PairRoomHistoryReadResponse readLatestPairRoomHistory(final String accessCode) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistoryEntity pairRoomHistoryEntity =
                pairRoomHistoryRepository.fetchLatestHistoryByPairRoomId(pairRoom.getId());
        return PairRoomHistoryReadResponse.of(pairRoomHistoryEntity.getId(), pairRoomHistoryEntity.toDomain());
    }

    @Transactional
    public void updateTimerRemainingTime(final String accessCode, final long newTimerRemainingTime) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistoryEntity pairRoomHistoryEntity = pairRoomHistoryRepository
                .fetchLatestHistoryByPairRoomId(pairRoom.getId());
        pairRoomHistoryEntity.updateTimerRemainingTime(newTimerRemainingTime);
    }

    @Transactional
    public void updateTimerDuration(final String accessCode, final long newTimerDuration) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistoryEntity pairRoomHistoryEntity = pairRoomHistoryRepository
                .fetchLatestHistoryByPairRoomId(pairRoom.getId());
        pairRoomHistoryEntity.updateTimerDuration(newTimerDuration);
    }
}
