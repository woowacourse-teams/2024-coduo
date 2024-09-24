package site.coduo.pairroom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;

public interface PairRoomMemberRepository extends JpaRepository<PairRoomMemberEntity, Long> {

    List<PairRoomMemberEntity> findByMember(Member member);
}
