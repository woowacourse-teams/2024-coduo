package site.coduo.pairroom.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.dto.CreatePairRoom;
import site.coduo.pairroom.repository.PairRoomRepository;

@RequiredArgsConstructor
@Service
public class PairRoomService {

    private final PairRoomRepository repository;

    public String save(final CreatePairRoom createPairRoom) {
        final PairRoom pairRoom = new PairRoom(createPairRoom.nameA(), createPairRoom.nameB());
        final PairRoom saved = repository.save(pairRoom);
        return saved.getAccessCode()
                .getValue();
    }

    public PairRoom findByAccessCode(final String accessCode) {
        return repository.fetchByAccessCode(new AccessCode(accessCode));
    }
}
