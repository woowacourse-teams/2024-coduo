package site.coduo.pairroomhistory.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import site.coduo.pairroomhistory.exception.PairRoomHistoryNotFoundException;

public interface PairRoomHistoryRepository extends JpaRepository<PairRoomHistoryEntity, Long> {

    default PairRoomHistoryEntity fetchTopByPairRoomIdOrderByCreatedAtDesc(long pairRoomId) {
        return findTopByPairRoomIdOrderByCreatedAtDesc(pairRoomId)
                .orElseThrow(() -> new PairRoomHistoryNotFoundException("해당 페어룸의 히스토리가 존재하지 않습니다."));
    }

    Optional<PairRoomHistoryEntity> findTopByPairRoomIdOrderByCreatedAtDesc(long pairRoomId);

    default void updateByPairRoomIdLatestTimerRemainingTime(long pairRoomId, long timerRemainingTime) {
        PairRoomHistoryEntity pairRoomHistoryEntity = fetchTopByPairRoomIdOrderByCreatedAtDesc(pairRoomId);
        updateByIdTimerRemainingTime(pairRoomHistoryEntity.getId(), timerRemainingTime);
    }

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE PairRoomHistoryEntity prh SET prh.timerRemainingTime = :timerRemainingTime " +
           "WHERE prh.id = :id")
    void updateByIdTimerRemainingTime(@Param("id") long id, @Param("timerRemainingTime") long timerRemainingTime);
}
