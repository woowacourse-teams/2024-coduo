package site.coduo.pairroom.service.port;

import java.util.Optional;

import site.coduo.pairroom.domain.PairRoom;

public interface PairRoomRepository {

    Optional<PairRoom> findById(Long id);

    PairRoom save(PairRoom pairRoom);
}
