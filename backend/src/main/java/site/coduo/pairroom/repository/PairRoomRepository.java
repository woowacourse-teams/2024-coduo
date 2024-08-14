package site.coduo.pairroom.repository;

import java.time.LocalTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

public interface PairRoomRepository extends JpaRepository<PairRoom, Long> {

    Optional<PairRoom> findByAccessCode(AccessCode accessCode);

    default PairRoom fetchByAccessCode(AccessCode accessCode) {
        return findByAccessCode(accessCode)
                .orElseThrow(() -> new PairRoomNotFoundException("존재하지 않는 페어룸 접근 코드입니다."));
    }

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE PairRoom pr SET pr.timerDuration = :newTimerDuration WHERE pr.id = :id")
    int updateTimerDuration(@Param("id") Long id, @Param("newTimerDuration") LocalTime newTimerDuration);
}
