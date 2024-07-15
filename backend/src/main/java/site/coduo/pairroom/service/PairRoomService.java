package site.coduo.pairroom.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.dto.CreatePairRoom;
import site.coduo.pairroom.repository.PairRoomRepository;

@RequiredArgsConstructor
@Service
public class PairRoomService {

    private final PairRoomRepository repository;

    public String save(final CreatePairRoom createPairRoom) {
        final String uuid = UUID.randomUUID().toString().substring(PairRoom.ACCESS_CODE_LENGTH);
        final PairRoom pairRoom = new PairRoom(createPairRoom.nameA(), createPairRoom.nameB(), uuid);
        final PairRoom saved = repository.save(pairRoom);
        return saved.getAccessCode();
    }

    public PairRoom findByAccessCode(final String accessCode) {
        return repository.fetchByAccessCode(accessCode);
    }
}
