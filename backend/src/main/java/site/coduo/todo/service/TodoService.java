package site.coduo.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.domain.TodoSort;
import site.coduo.todo.exception.TodoNotFoundException;
import site.coduo.todo.repository.TodoEntity;
import site.coduo.todo.repository.TodoRepository;

@RequiredArgsConstructor
@Service
@Transactional
public class TodoService {

    private static final int NO_SORT_VALUE = 0;
    private static final boolean INITIAL_TODO_CHECKED = false;

    private final PairRoomRepository pairRoomRepository;
    private final TodoRepository todoRepository;

    @Transactional(readOnly = true)
    public List<Todo> getAllOrderBySort(final String accessCode) {
        final PairRoomEntity pairRoom = pairRoomRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new PairRoomNotFoundException("해당 Access Code의 페어룸은 존재하지 않습니다. - " + accessCode));

        return todoRepository.findAllByPairRoomEntityOrderBySortAsc(pairRoom)
                .stream()
                .map(TodoEntity::toDomain)
                .toList();
    }

    public void createTodo(final String accessCode, final String content) {
        final PairRoomEntity pairRoom = pairRoomRepository.findByAccessCode(accessCode)
                .orElseThrow(() -> new PairRoomNotFoundException("해당 Access Code의 페어룸은 존재하지 않습니다. - " + accessCode));
        final TodoSort nextToLastSort = getLastTodoSort(pairRoom);
        final Todo todo = new Todo(null, content, nextToLastSort.getSort(), INITIAL_TODO_CHECKED);
        final TodoEntity todoEntity = new TodoEntity(todo, pairRoom);

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
        final Todo todo = todoRepository.findById(todoId)
                .map(TodoEntity::toDomain)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + todoId));
        final Todo updatedTodo = todo.updateContent(content);
        final TodoEntity updatedTodoEntity = new TodoEntity(updatedTodo);
        todoRepository.save(updatedTodoEntity);
    }

    public void toggleTodoChecked(final Long todoId) {
        final Todo todo = todoRepository.findById(todoId)
                .map(TodoEntity::toDomain)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + todoId));
        final Todo updatedTodo = todo.toggleTodoChecked();
        final TodoEntity updatedTodoEntity = new TodoEntity(updatedTodo);
        todoRepository.save(updatedTodoEntity);
    }

    public void updateTodoSort(final Long targetTodoId, final int destinationSort) {
        final TodoEntity targetTodo = todoRepository.findById(targetTodoId)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + targetTodoId));
        final List<Todo> allByPairRoom = todoRepository
                .findAllByPairRoomEntityOrderBySortAsc(targetTodo.getPairRoomEntity())
                .stream()
                .map(TodoEntity::toDomain)
                .toList();

        final Todo updated = targetTodo.toDomain().updateSort(allByPairRoom, destinationSort);
        final TodoEntity updatedTodoEntity = new TodoEntity(updated, targetTodo.getPairRoomEntity());
        todoRepository.save(updatedTodoEntity);
    }

    public void deleteTodo(final Long todoId) {
        todoRepository.deleteById(todoId);
    }
}
