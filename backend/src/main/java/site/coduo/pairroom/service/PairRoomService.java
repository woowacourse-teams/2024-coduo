package site.coduo.pairroom.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.AccessCodeFactory;
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeStrategy;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.TimerDurationCreateRequest;
import site.coduo.pairroom.exception.InvalidTimerDurationException;
import site.coduo.pairroom.repository.PairRoomRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PairRoomService {

    private static final int UPDATED_ROW_COUNT = 1;

    private final PairRoomRepository pairRoomRepository;

    @Transactional
    public String savePairNameAndAccessCode(final PairRoomCreateRequest request) {
        final Pair pair = new Pair(new PairName(request.firstPair()), new PairName(request.secondPair()));
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(PairRoom::getAccessCode)
                .toList();

        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());
        final PairRoom pairRoom = new PairRoom(pair, accessCodeFactory.generateWithoutDuplication(accessCodes));

        pairRoomRepository.save(pairRoom);

        return pairRoom.getAccessCodeText();
    }

    @Transactional
    public void saveTimerDuration(final String accessCode, final TimerDurationCreateRequest request) {
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));

        if (pairRoomRepository.updateTimerDuration(pairRoom.getId(), request.timerDuration()) != UPDATED_ROW_COUNT) {
            throw new InvalidTimerDurationException("타이머 시간을 저장하는데 실패했습니다.");
        }
    }

    public PairRoom findByAccessCode(final String accessCode) {
        return pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
    }

    @Transactional
    public void deletePairRoom(final String accessCode) {
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        pairRoomRepository.delete(pairRoom);
    }
}
