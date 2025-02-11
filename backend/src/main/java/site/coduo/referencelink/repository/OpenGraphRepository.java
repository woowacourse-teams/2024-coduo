package site.coduo.referencelink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import site.coduo.pairroom.repository.PairRoomEntity;

public interface OpenGraphRepository extends JpaRepository<OpenGraphEntity, Long> {

    void deleteByReferenceLinkEntity(ReferenceLinkEntity referenceLinkEntity);

    Optional<OpenGraphEntity> findByReferenceLinkEntityId(Long id);

    @Query("SELECT og FROM OpenGraphEntity og JOIN FETCH og.referenceLinkEntity rl WHERE rl.pairRoomEntity =:pairRoomEntity")
    List<OpenGraphEntity> findAllByPairRoomEntity(@Param(value = "pairRoomEntity") PairRoomEntity pairRoomEntity);
}
