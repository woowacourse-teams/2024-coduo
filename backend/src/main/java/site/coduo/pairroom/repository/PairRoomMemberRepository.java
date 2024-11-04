package site.coduo.pairroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;
import site.coduo.pairroom.exception.PairRoomMemberNotFoundException;

public interface PairRoomMemberRepository extends JpaRepository<PairRoomMemberEntity, Long> {

    List<PairRoomMemberEntity> findByMember(Member member);

    Optional<PairRoomMemberEntity> findByPairRoomAndMember(PairRoomEntity pairRoom, Member member);

    default PairRoomMemberEntity fetchByPairRoomAndMember(PairRoomEntity pairRoom, Member member) {
        return findByPairRoomAndMember(pairRoom, member)
                .orElseThrow(() -> new PairRoomMemberNotFoundException(String.format("멤버로 생성된 페어룸이 존재하지 않습니다. %s",
                        member.getId())));
    }

    boolean existsByPairRoomAndMember(PairRoomEntity pairRoom, Member member);
}
