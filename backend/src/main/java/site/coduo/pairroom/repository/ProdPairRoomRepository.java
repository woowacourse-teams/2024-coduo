package site.coduo.pairroom.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;

@RequiredArgsConstructor
@Repository
public class ProdPairRoomRepository implements site.coduo.pairroom.service.port.PairRoomRepository {

    private final PairRoomRepository pairRoomRepository;

    @Override
    public Optional<PairRoom> findById(final Long id) {
        return pairRoomRepository.findById(id);
    }

    @Override
    public PairRoom save(final PairRoom pairRoom) {
        return pairRoomRepository.save(pairRoom);
    }
}
