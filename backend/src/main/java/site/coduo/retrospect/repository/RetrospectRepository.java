package site.coduo.retrospect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomMember;

public interface RetrospectRepository extends JpaRepository<RetrospectEntity, Long> {

    List<RetrospectEntity> findAllByPairRoomMember(PairRoomMember pairRoomMember);

    void deleteAllByPairRoomMember(PairRoomMember pairRoomMember);

    boolean existsRetrospectEntityByPairRoomMember(PairRoomMember pairRoomMember);
}
