package site.coduo.todo.service;

import java.util.List;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.exception.InactivePairRoomException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.domain.TodoSort;
import site.coduo.todo.domain.TodoSortComparator;
import site.coduo.todo.exception.TodoNotFoundException;
import site.coduo.todo.repository.TodoEntity;
import site.coduo.todo.repository.TodoRepository;
import site.coduo.todo.service.dto.TodoReadResponse;

@RequiredArgsConstructor
@Service
@Transactional
public class TodoService {

    private static final int NO_SORT_VALUE = 0;
    private static final boolean INITIAL_TODO_CHECKED = false;

    private final PairRoomRepository pairRoomRepository;
    private final TodoRepository todoRepository;

    @Transactional(readOnly = true)
    public List<TodoReadResponse> getAllOrderBySort(final String accessCode) {
        final PairRoomEntity pairRoom = pairRoomRepository.fetchByAccessCode(accessCode);
        final List<Todo> todos = todoRepository.findAllByPairRoomEntity(pairRoom)
                .stream()
                .map(TodoEntity::toDomain)
                .sorted(new TodoSortComparator())
                .toList();
        
        return IntStream.range(0, todos.size())
                .mapToObj(index -> TodoReadResponse.from(todos.get(index), index))
                .toList();
    }

    public void createTodo(final String accessCode, final String content) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        checkPairRoomIsActive(pairRoomEntity);
        final TodoSort nextToLastSort = getLastTodoSort(pairRoomEntity);
        final Todo todo = new Todo(null, content, nextToLastSort.getSort(), INITIAL_TODO_CHECKED);
        final TodoEntity todoEntity = new TodoEntity(todo, pairRoomEntity);

        todoRepository.save(todoEntity);
    }

    private TodoSort getLastTodoSort(final PairRoomEntity pairRoom) {
        return todoRepository.findTopByPairRoomEntityOrderBySortDesc(pairRoom)
                .map(TodoEntity::toDomain)
                .map(Todo::getSort)
                .orElseGet(() -> new TodoSort(NO_SORT_VALUE))
                .countNextSort();
    }

    public void updateTodoContent(final Long todoId, final String content) {
        final TodoEntity todoEntity = todoRepository.fetchById(todoId);
        checkPairRoomIsActive(todoEntity.getPairRoomEntity());
        todoEntity.updateContent(content);
    }

    public void toggleTodoChecked(final Long todoId) {
        final TodoEntity todoEntity = todoRepository.fetchById(todoId);
        checkPairRoomIsActive(todoEntity.getPairRoomEntity());
        todoEntity.toggleTodoChecked();
    }

    public void updateTodoSort(final Long targetTodoId, final int destinationSort) {
        final TodoEntity targetTodo = todoRepository.findById(targetTodoId)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + targetTodoId));
        checkPairRoomIsActive(targetTodo.getPairRoomEntity());
        final List<Todo> allByPairRoom = todoRepository
                .findAllByPairRoomEntity(targetTodo.getPairRoomEntity())
                .stream()
                .map(TodoEntity::toDomain)
                .sorted(new TodoSortComparator())
                .toList();

        final Todo updated = targetTodo.toDomain().updateSort(allByPairRoom, destinationSort);
        final TodoEntity updatedTodoEntity = new TodoEntity(updated, targetTodo.getPairRoomEntity());
        todoRepository.save(updatedTodoEntity);
    }

    public void deleteTodo(final Long todoId) {
        final TodoEntity todoEntity = todoRepository.findById(todoId)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + todoId));
        checkPairRoomIsActive(todoEntity.getPairRoomEntity());
        todoRepository.deleteById(todoId);
    }

    private void checkPairRoomIsActive(final PairRoomEntity pairRoomEntity) {
        if (!pairRoomEntity.isActive()) {
            throw new InactivePairRoomException("이미 종료되거나 삭제된 페어룸의 투두를 조작할 수 없습니다.");
        }
    }
}
