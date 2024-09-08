package site.coduo.timer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.timer.exception.TimerNotFoundException;

public interface TimerRepository extends JpaRepository<TimerEntity, Long> {

    default TimerEntity fetchTimerByPairRoomId(final long pairRoomId) {
        return findByPairRoomEntityId(pairRoomId)
                .orElseThrow(() -> new TimerNotFoundException("해당 페어룸의 타이머가 존재하지 않습니다."));
    }

    Optional<TimerEntity> findByPairRoomEntityId(long pairRoomId);
}
