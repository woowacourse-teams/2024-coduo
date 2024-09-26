package site.coduo.referencelink.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;

public interface ReferenceLinkRepository extends JpaRepository<ReferenceLinkEntity, Long> {

    List<ReferenceLinkEntity> findByPairRoomEntity(PairRoomEntity pairRoomEntity);
}
