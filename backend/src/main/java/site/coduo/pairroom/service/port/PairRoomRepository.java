package site.coduo.pairroom.service.port;

import java.util.Optional;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;

public interface PairRoomRepository {

    Optional<PairRoom> findByAccessCode(AccessCode accessCode);

    PairRoom save(PairRoom pairRoom);
}
