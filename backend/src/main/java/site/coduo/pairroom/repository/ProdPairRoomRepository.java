package site.coduo.pairroom.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@RequiredArgsConstructor
@Repository
public class ProdPairRoomRepository implements site.coduo.pairroom.service.port.PairRoomRepository {

    private final PairRoomRepository pairRoomJpaRepository;

    @Override
    public Optional<PairRoom> findByAccessCode(final AccessCode accessCode) {
        return Optional.of(pairRoomJpaRepository.findByAccessCode(accessCode.getValue())
                .orElseThrow().toDomain());
    }

    @Override
    public PairRoom save(final PairRoom pairRoom) {
        return pairRoomJpaRepository.save(site.coduo.pairroom.repository.PairRoomEntity.from(pairRoom))
                .toDomain();
    }
}
