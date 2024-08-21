package site.coduo.pairroomhistory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroomhistory.exception.PairRoomHistoryNotFoundException;

public interface PairRoomHistoryRepository extends JpaRepository<PairRoomHistoryEntity, Long> {

    default PairRoomHistoryEntity fetchLatestHistoryByPairRoomId(long pairRoomId) {
        return findTopByPairRoomIdOrderByCreatedAtDesc(pairRoomId)
                .orElseThrow(() -> new PairRoomHistoryNotFoundException("해당 페어룸의 히스토리가 존재하지 않습니다."));
    }

    Optional<PairRoomHistoryEntity> findTopByPairRoomIdOrderByCreatedAtDesc(long pairRoomId);

    boolean existsByPairRoomId(long pairRoomId);
}
