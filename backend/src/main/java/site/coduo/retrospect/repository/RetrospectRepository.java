package site.coduo.retrospect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.member.domain.Member;
import site.coduo.pairroom.repository.PairRoomEntity;

public interface RetrospectRepository extends JpaRepository<RetrospectEntity, Long> {

    Optional<RetrospectEntity> findByPairRoomAndMember(PairRoomEntity pairRoom, Member member);

    List<RetrospectEntity> findAllByMember(Member member);
}
