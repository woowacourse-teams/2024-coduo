package site.coduo.pairroomhistory.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.domain.PairRoomHistory;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.dto.PairRoomHistoryReadResponse;
import site.coduo.pairroomhistory.exception.PairRoomHistoryNotFoundException;
import site.coduo.pairroomhistory.repository.PairRoomHistoryEntity;
import site.coduo.pairroomhistory.repository.PairRoomHistoryRepository;

@RequiredArgsConstructor
@Service
public class PairRoomHistoryService {

    private final PairRoomHistoryRepository pairRoomHistoryRepository;
    private final PairRoomService pairRoomService;

    public void createPairRoomHistory(final String accessCode, final PairRoomHistoryCreateRequest request) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistory pairRoomHistory = PairRoomHistory.builder()
                .pairRoom(pairRoom)
                .driver(request.driver())
                .navigator(request.navigator())
                .timerRound(request.timerRound())
                .timerRemainingTime(request.timerRemainingTime())
                .build();

        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(pairRoomHistory));
    }

    public PairRoomHistoryReadResponse readPairRoomHistory(final String accessCode) {
        final PairRoom pairRoom = pairRoomService.findByAccessCode(accessCode);
        final PairRoomHistoryEntity pairRoomHistoryEntity =
                pairRoomHistoryRepository.findTopByPairRoomIdOrderByCreatedAtDesc(pairRoom.getId())
                        .orElseThrow(() -> new PairRoomHistoryNotFoundException("해당 페어룸의 히스토리가 존재하지 않습니다."));

        return new PairRoomHistoryReadResponse(
                pairRoomHistoryEntity.getId(),
                pairRoomHistoryEntity.getDriver(),
                pairRoomHistoryEntity.getNavigator(),
                pairRoomHistoryEntity.getTimerRound(),
                pairRoomHistoryEntity.getTimerRemainingTime()
        );
    }
}
