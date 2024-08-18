package site.coduo.todo.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.PairRoom;

public interface TodoJpaRepository extends JpaRepository<TodoEntity, Long> {

    List<TodoEntity> findAllByPairRoomOrderBySortAsc(PairRoom pairRoom);

    Optional<TodoEntity> findTopByPairRoomOrderBySortDesc(PairRoom pairRoom);
}
