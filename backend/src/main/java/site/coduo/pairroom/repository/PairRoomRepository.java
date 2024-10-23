package site.coduo.pairroom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

public interface PairRoomRepository extends JpaRepository<PairRoomEntity, Long> {

    Optional<PairRoomEntity> findByAccessCode(String accessCode);

    Optional<PairRoomEntity> findByEasyAccessCode(String easyAccessCode);

    default PairRoomEntity fetchByAccessCode(String accessCodeText) {
        return findByAccessCode(accessCodeText)
                .orElseThrow(() -> new PairRoomNotFoundException("존재하지 않는 페어룸 접근 코드입니다."));
    }

    default PairRoomEntity fetchByAccessCode(AccessCode accessCode) {
        return findByAccessCode(accessCode.getValue())
                .orElseThrow(() -> new PairRoomNotFoundException("존재하지 않는 페어룸 접근 코드입니다."));
    }

    boolean existsByAccessCode(String accessCodeText);

    boolean existsByEasyAccessCode(String accessCodeText);

    boolean existsByAccessCodeAndStatusNot(String accessCode, PairRoomStatus status);
}
