package site.coduo.todo.service.port;

import java.util.List;
import java.util.Optional;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.Todo;

public interface TodoRepository {

    List<Todo> findAllByOrderBySortAsc();

    Optional<Todo> findById(Long id);

    Optional<Todo> findTopByPairRoomOrderBySortDesc(PairRoom pairRoom);

    Todo save(Todo todo);

    void deleteById(Long id);
}
