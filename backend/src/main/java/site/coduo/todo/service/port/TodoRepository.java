package site.coduo.todo.service.port;

import java.util.Optional;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.Todo;

public interface TodoRepository {

    Todo save(Todo todo);

    Optional<Todo> findTopByPairRoomOrderBySortDesc(PairRoom pairRoom);

    Optional<Todo> findById(Long id);

    void deleteById(Long id);
}
