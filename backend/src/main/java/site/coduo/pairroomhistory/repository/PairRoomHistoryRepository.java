package site.coduo.pairroomhistory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PairRoomHistoryRepository extends JpaRepository<PairRoomHistoryEntity, Long> {

    Optional<PairRoomHistoryEntity> findTopByPairRoomIdOrderByCreatedAtDesc(long pairRoomId);
}
