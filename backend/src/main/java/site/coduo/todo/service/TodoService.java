package site.coduo.todo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.service.port.PairRoomRepository;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.domain.TodoSort;
import site.coduo.todo.domain.exception.TodoNotFoundException;
import site.coduo.todo.service.port.TodoRepository;

@RequiredArgsConstructor
@Service
public class TodoService {

    private static final int NO_SORT_VALUE = 0;
    private static final boolean INITIAL_TODO_CHECKED = false;

    private final PairRoomRepository pairRoomRepository;
    private final TodoRepository todoRepository;

    public void createTodo(final Long pairRoomId, final String content) {
        final PairRoom pairRoom = pairRoomRepository.findById(pairRoomId)
                .orElseThrow(() -> new PairRoomNotFoundException("해당 아이디의 페어룸은 존재하지 않습니다. - " + pairRoomId));
        final TodoSort nextToLastSort = getLastTodoSort(pairRoom).orElseGet(() -> new TodoSort(NO_SORT_VALUE))
                .countNextSort();
        final Todo todo = new Todo(null, pairRoom, content, nextToLastSort.getSort(), INITIAL_TODO_CHECKED);

        todoRepository.save(todo);
    }

    private Optional<TodoSort> getLastTodoSort(final PairRoom pairRoom) {
        return todoRepository.findTopByPairRoomOrderBySortDesc(pairRoom)
                .map(Todo::getSort);
    }

    public void updateTodoContent(final Long todoId, final String content) {
        final Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new TodoNotFoundException("존재하지 않은 todo id입니다." + todoId));
        final Todo updatedTodo = todo.updateContent(content);
        todoRepository.save(updatedTodo);
    }
}
