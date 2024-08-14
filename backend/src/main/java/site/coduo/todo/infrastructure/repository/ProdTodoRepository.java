package site.coduo.todo.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.service.port.TodoRepository;

@RequiredArgsConstructor
@Repository
public class ProdTodoRepository implements TodoRepository {

    private final TodoJpaRepository todoJpaRepository;

    @Override
    public Todo save(final Todo todo) {
        final TodoEntity entity = new TodoEntity(todo);
        return todoJpaRepository.save(entity)
                .toDomain();
    }

    @Override
    public Optional<Todo> findTopByPairRoomOrderBySortDesc(final PairRoom pairRoom) {
        return todoJpaRepository.findTopByPairRoomOrderBySortDesc(pairRoom)
                .map(TodoEntity::toDomain);
    }

    @Override
    public Optional<Todo> findById(final Long id) {
        return todoJpaRepository.findById(id)
                .map(TodoEntity::toDomain);
    }

    @Override
    public void deleteById(final Long id) {
        todoJpaRepository.deleteById(id);
    }
}
