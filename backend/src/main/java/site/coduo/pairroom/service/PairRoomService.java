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
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PairRoomService {

    private final PairRoomRepository pairRoomRepository;

    @Transactional
    public String save(final PairRoomCreateRequest request) {
        final PairRoomStatus status = PairRoomStatus.findByName(request.status());
        final Pair pair = new Pair(new PairName(request.firstPair()), new PairName(request.secondPair()));
        final List<AccessCode> accessCodes = pairRoomRepository.findAll()
                .stream()
                .map(site.coduo.pairroom.repository.PairRoomEntity::getAccessCode)
                .map(AccessCode::new)
                .toList();

        final AccessCodeFactory accessCodeFactory = new AccessCodeFactory(new UUIDAccessCodeStrategy());
        final PairRoom pairRoom = new PairRoom(pair, status, accessCodeFactory.generate(accessCodes));

        pairRoomRepository.save(site.coduo.pairroom.repository.PairRoomEntity.from(pairRoom));

        return pairRoom.getAccessCodeText();
    }

    @Transactional
    public void updatePairRoomStatus(final String accessCode, final String statusName) {
        final PairRoomStatus status = PairRoomStatus.findByName(statusName);
        final site.coduo.pairroom.repository.PairRoomEntity entity = pairRoomRepository.fetchByAccessCode(accessCode);
        entity.updateStatus(status);
    }

    public PairRoomReadResponse findByAccessCode(final String accessCode) {
        return PairRoomReadResponse.from(pairRoomRepository.fetchByAccessCode(accessCode));
    }
}
