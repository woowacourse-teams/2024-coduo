package site.coduo.pairroom.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.AccessCodeFactory;
import site.coduo.pairroom.domain.accesscode.UUIDAccessCodeStrategy;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.repository.PairRoomRepository;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PairRoomService {

    private static final int UPDATED_ROW_COUNT = 1;

    private final PairRoomRepository pairRoomRepository;

    @Transactional
    public String save(final PairRoomCreateRequest request) {
        final Pair pair = new Pair(new PairName(request.firstPair()), new PairName(request.secondPair()));
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(PairRoom::getAccessCode)
                .toList();
        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());

        final PairRoom pairRoom = new PairRoom(pair, status, accessCodeFactory.generate(accessCodes));

        pairRoomRepository.save(pairRoom);

        return pairRoom.getAccessCodeText();
    }

    public void updatePairRoomStatus(final String accessCode, final String statusName) {
        final PairRoomStatus status = PairRoomStatus.findByName(statusName);
        final int updatedCount = pairRoomRepository.updateStatusByAccessCode(new AccessCode(accessCode), status);

        if (updatedCount != UPDATED_ROW_COUNT) {
            throw new InvalidAccessCodeException("accessCode가 존재하지 않거나 중복되어 페어룸 상태 변경에 실패했습니다.");
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
