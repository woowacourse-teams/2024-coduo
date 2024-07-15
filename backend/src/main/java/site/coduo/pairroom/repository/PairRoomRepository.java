package site.coduo.pairroom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

public interface PairRoomRepository extends JpaRepository<PairRoom, Long> {

    Optional<PairRoom> findByAccessCode(AccessCode accessCode);

    default PairRoom fetchByAccessCode(AccessCode accessCode) {
        return findByAccessCode(accessCode)
                .orElseThrow(() -> new PairRoomNotFoundException("존재하지 않는 페어룸 접근 코드입니다."));
    }
}
