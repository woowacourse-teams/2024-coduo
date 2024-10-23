package site.coduo.retrospect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomMemberEntity;

public interface RetrospectV2Repository extends JpaRepository<RetrospectV2Entity, Long> {

    List<RetrospectV2Entity> findAllByPairRoomMember(PairRoomMemberEntity pairRoomMember);

    void deleteAllByPairRoomMember(PairRoomMemberEntity pairRoomMember);

}
