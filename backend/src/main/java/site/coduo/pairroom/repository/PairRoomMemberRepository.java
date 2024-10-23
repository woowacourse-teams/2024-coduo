package site.coduo.pairroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;

public interface PairRoomMemberRepository extends JpaRepository<PairRoomMemberEntity, Long> {

    List<PairRoomMemberEntity> findByMember(Member member);

    //TODO 두개 이상이면 안됨
    PairRoomMemberEntity findByPairRoomAndMember(PairRoomEntity pairRoom, Member member);

    boolean existsByPairRoomAndMember(PairRoomEntity pairRoom, Member member);
}
