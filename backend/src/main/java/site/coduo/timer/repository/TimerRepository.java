package site.coduo.timer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.timer.exception.TimerNotFoundException;

public interface TimerRepository extends JpaRepository<TimerEntity, Long> {

    default TimerEntity fetchTimerByPairRoomEntity(final PairRoomEntity pairRoomEntity) {
        return findByPairRoomEntity(pairRoomEntity)
                .orElseThrow(() -> new TimerNotFoundException("해당 페어룸의 타이머가 존재하지 않습니다."));
    }

    Optional<TimerEntity> findByPairRoomEntity(PairRoomEntity pairRoomEntity);

    default TimerEntity fetchTimerByAccessCode(final String accessCode) {
        return findByPairRoomEntityAccessCode(accessCode)
                .orElseThrow(() -> new TimerNotFoundException("해당 타이머를 찾을 수 없습니다."));
    }

    Optional<TimerEntity> findByPairRoomEntityAccessCode(String accessCode);
}
