package site.coduo.todo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

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
}
