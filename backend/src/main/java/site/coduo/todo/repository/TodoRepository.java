package site.coduo.todo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.todo.exception.TodoNotFoundException;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

    default TodoEntity fetchById(Long id) {
        return findById(id).orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + id));
    }

    List<TodoEntity> findAllByPairRoomEntity(PairRoomEntity pairRoomEntity);

    Optional<TodoEntity> findTopByPairRoomEntityOrderBySortDesc(PairRoomEntity pairRoomEntity);
}
