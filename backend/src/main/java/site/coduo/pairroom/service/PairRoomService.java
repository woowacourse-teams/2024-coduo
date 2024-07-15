package site.coduo.pairroom.service;

import java.time.LocalDateTime;
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
        final UUID uuid = UUID.randomUUID();
        final PairRoom pairRoom = new PairRoom(null, createPairRoom.nameA(), createPairRoom.nameB(),
                uuid.toString().substring(PairRoom.ACCESS_CODE_LENGTH), LocalDateTime.now(), null);
        final PairRoom saved = repository.save(pairRoom);
        return saved.getAccessCode();
    }

    public PairRoom findByAccessCode(final String accessCode) {
        return repository.fetchByAccessCode(accessCode);
    }
}
