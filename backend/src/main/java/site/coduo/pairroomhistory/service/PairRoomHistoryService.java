package site.coduo.pairroomhistory.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.domain.PairRoomHistory;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
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
                .timerRemainigTime(request.timerRemainigTime())
                .build();

        pairRoomHistoryRepository.save(new PairRoomHistoryEntity(pairRoomHistory));
    }
}
