package site.coduo.pairroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import site.coduo.member.domain.Member;

public interface PairRoomMemberRepository extends JpaRepository<PairRoomMemberEntity, Long> {

    List<PairRoomMemberEntity> findByMember(Member member);

    @Query("select p from PairRoomMemberEntity p where p.id <= 10")
    List<PairRoomMemberEntity> findLimit10();
}
