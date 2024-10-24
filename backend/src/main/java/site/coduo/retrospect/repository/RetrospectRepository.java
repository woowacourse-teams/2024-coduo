package site.coduo.retrospect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;

public interface RetrospectRepository extends JpaRepository<RetrospectEntity, Long> {

    List<RetrospectEntity> findAllByPairRoomMember(PairRoomMemberEntity pairRoomMember);

    void deleteAllByPairRoomMember(PairRoomMemberEntity pairRoomMember);

    boolean existsRetrospectEntityByPairRoomMember(PairRoomMemberEntity pairRoomMember);
}
