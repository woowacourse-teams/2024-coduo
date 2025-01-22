package site.coduo.pairroom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.repository.MemberEntity;
import site.coduo.pairroom.exception.PairRoomMemberNotFoundException;

public interface PairRoomMemberRepository extends JpaRepository<PairRoomMember, Long> {

    List<PairRoomMember> findByMemberEntity(MemberEntity memberEntity);

    Optional<PairRoomMember> findByPairRoomEntityAndMemberEntity(PairRoomEntity pairRoom, MemberEntity memberEntity);

    default PairRoomMember fetchByPairRoomAndMember(PairRoomEntity pairRoom, MemberEntity memberEntity) {
        return findByPairRoomEntityAndMemberEntity(pairRoom, memberEntity)
                .orElseThrow(() -> new PairRoomMemberNotFoundException(String.format("멤버로 생성된 페어룸이 존재하지 않습니다. %s",
                        memberEntity.getId())));
    }

    boolean existsByPairRoomEntityAndMemberEntity(PairRoomEntity pairRoom, MemberEntity memberEntity);
}
