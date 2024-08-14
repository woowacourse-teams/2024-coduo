package site.coduo.todo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.mock.FakePairRoomRepository;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.domain.exception.TodoNotFoundException;
import site.coduo.todo.mock.FakeTodoRepository;

@DisplayName("TodoService 테스트")
class TodoServiceTest {

    private FakePairRoomRepository pairRoomRepository;
    private FakeTodoRepository todoRepository;
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        final FakePairRoomRepository fakePairRoomRepository = new FakePairRoomRepository();
        final FakeTodoRepository fakeTodoRepository = new FakeTodoRepository();
        final TodoService todoService = new TodoService(fakePairRoomRepository, fakeTodoRepository);

        this.pairRoomRepository = fakePairRoomRepository;
        this.todoRepository = fakeTodoRepository;
        this.todoService = todoService;
    }

    @DisplayName("페어룸 아이디, 투두 내용을 입력받으면 Todo 객체를 생성해 저장한다.")
    @Test
    void createTodo() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        pairRoomRepository.save(pairRoom);

        final Long pairRoomId = 1L;
        final String content = "켈리 치킨 사주기이이이이이";

        // When
        todoService.createTodo(pairRoomId, content);

        // Then
        final Optional<Todo> findSavedTodo = todoRepository.findById(1L);
        assertThat(findSavedTodo).isPresent();

        final Todo savedTodo = findSavedTodo.get();
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(savedTodo.getPairRoom().getId()).isEqualTo(pairRoomId);
            softAssertions.assertThat(savedTodo.getContent().getContent()).isEqualTo(content);
            softAssertions.assertThat(savedTodo.getIsChecked().isChecked()).isFalse();
        });
    }

    @DisplayName("존재하지 않는 페어룸 아이디를 입력하면 예외를 발생시킨다.")
    @Test
    void createPairRoomWithNotFoundPairRoomId() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        pairRoomRepository.save(pairRoom);

        final Long pairRoomId = 1221L;
        final String content = "켈리 치킨 사주기이이이이이";

        // When & Then
        assertThatThrownBy(() -> todoService.createTodo(pairRoomId, content))
                .isInstanceOf(PairRoomNotFoundException.class)
                .hasMessage("해당 아이디의 페어룸은 존재하지 않습니다. - " + pairRoomId);
    }

    @DisplayName("투두 id와 새로운 투두 내용이 입력되면 해당 투두를 저장소에서 가져와 내용을 변경한뒤 저장한다.")
    @Test
    void updateTodoContent() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoom, content, sort, isChecked);
        todoRepository.save(todo);

        final Long todoId = 1L;
        final String newContent = "이거슨 새로운 내용!";

        // When
        todoService.updateTodoContent(todoId, newContent);

        // Then
        final Optional<Todo> findUpdatedTodo = todoRepository.findById(1L);
        assertThat(findUpdatedTodo).isPresent();

        final Todo updatedTodo = findUpdatedTodo.get();
        assertThat(updatedTodo.getContent().getContent()).isEqualTo(newContent);
    }

    @DisplayName("존재하지 않은 투두 아이디와 함께 내용 변경 요청을 하면 예외를 발생시킨다.")
    @Test
    void updateTodoContentWithNotFoundTodoId() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoom, content, sort, isChecked);
        todoRepository.save(todo);

        final Long todoId = 12323L;
        final String newContent = "이거슨 새로운 내용!";

        // When & Then
        assertThatThrownBy(() -> todoService.updateTodoContent(todoId, newContent))
                .isInstanceOf(TodoNotFoundException.class)
                .hasMessage("존재하지 않은 todo id입니다." + todoId);
    }

    @DisplayName("투두 id가 입력되면 해당 아이디의 투두를 찾아 체크 상태를 토글후 저장한다.")
    @Test
    void toggleTodoChecked() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoom, content, sort, isChecked);
        todoRepository.save(todo);

        final Long todoId = 1L;

        // When
        todoService.toggleTodoChecked(todoId);

        // Then
        final Optional<Todo> findUpdatedTodo = todoRepository.findById(1L);
        assertThat(findUpdatedTodo).isPresent();

        final Todo updatedTodo = findUpdatedTodo.get();
        assertThat(updatedTodo.getIsChecked().isChecked()).isTrue();
    }

    @DisplayName("존재하지 않은 투두 id와 함께 토글 요청이 들어오면 예외를 발생시킨다.")
    @Test
    void toggleTodoCheckedWithNotFoundTodoId() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoom, content, sort, isChecked);
        todoRepository.save(todo);

        final Long todoId = 12323L;

        // When & Then
        assertThatThrownBy(() -> todoService.toggleTodoChecked(todoId))
                .isInstanceOf(TodoNotFoundException.class)
                .hasMessage("존재하지 않은 todo id입니다." + todoId);
    }

    @DisplayName("투두 id가 입력되면 해당 id의 투두를 삭제한다.")
    @Test
    void deleteTodo() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoom, content, sort, isChecked);
        todoRepository.save(todo);

        final Long todoId = 1L;

        // When
        todoService.deleteTodo(todoId);

        // Then
        final Optional<Todo> findSavedTodo = todoRepository.findById(todoId);
        assertThat(findSavedTodo).isEmpty();
    }

    @DisplayName("저장된 모든 투두를 반환한다.")
    @Test
    void getAll() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final Todo todo1 = new Todo(1L, pairRoom, "투두1!!", 1024, false);
        final Todo todo2 = new Todo(2L, pairRoom, "투두2!!", 2048, false);
        final Todo todo3 = new Todo(3L, pairRoom, "투두3!!", 3434, true);
        final Todo todo4 = new Todo(4L, pairRoom, "투두4!!", 5555, false);
        todoRepository.save(todo1);
        todoRepository.save(todo2);
        todoRepository.save(todo3);
        todoRepository.save(todo4);

        // When
        final List<Todo> all = todoService.getAll();

        // Then
        assertThat(all).hasSize(4);
    }

    @DisplayName("현재 투두 아이디와 이동시킬 위치의 앞/뒤 투두 아이디를 입력하면 기존 투두의 정렬 값을 수정해 저장한다.")
    @Test
    void updateTodoSort() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final Todo targetTodo = new Todo(1L, pairRoom, "투두1!!", 1024, false);
        final Todo frontTodo = new Todo(2L, pairRoom, "투두2!!", 6144, false);
        final Todo backTodo = new Todo(3L, pairRoom, "투두3!!", 8192, false);
        todoRepository.save(targetTodo);
        todoRepository.save(frontTodo);
        todoRepository.save(backTodo);

        final long targetTodoId = 1L;
        final long frontTodoId = 2L;
        final long backTodoId = 3L;

        final int expect = 7168;

        // When
        todoService.updateTodoSort(targetTodoId, frontTodoId, backTodoId);

        // Then
        final Optional<Todo> findUpdatedTodo = todoRepository.findById(targetTodoId);
        assertThat(findUpdatedTodo).isPresent();

        final Todo updatedTodo = findUpdatedTodo.get();
        assertThat(updatedTodo.getSort().getSort()).isEqualTo(expect);
    }
}
