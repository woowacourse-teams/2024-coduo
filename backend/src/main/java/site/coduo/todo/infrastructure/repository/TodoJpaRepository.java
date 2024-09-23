package site.coduo.todo.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;

public interface TodoJpaRepository extends JpaRepository<TodoEntity, Long> {

    List<TodoEntity> findAllByPairRoomEntityOrderBySortAsc(PairRoomEntity pairRoomEntity);

    Optional<TodoEntity> findTopByPairRoomEntityOrderBySortDesc(PairRoomEntity pairRoomEntity);
}
