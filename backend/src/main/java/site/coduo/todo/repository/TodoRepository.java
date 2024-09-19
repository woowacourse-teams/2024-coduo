package site.coduo.todo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.PairRoom;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

    List<TodoEntity> findAllByPairRoomOrderBySortAsc(PairRoom pairRoom);

    Optional<TodoEntity> findTopByPairRoomOrderBySortDesc(PairRoom pairRoom);
}
