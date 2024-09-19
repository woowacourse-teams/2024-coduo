package site.coduo.todo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.mock.FakePairRoomRepository;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.exception.TodoNotFoundException;
import site.coduo.todo.mock.FakeTodoRepository;

@DisplayName("TodoService 테스트")
class TodoServiceTest {

    private FakePairRoomRepository pairRoomRepository;
    private FakeTodoRepository todoRepository;
    private TodoService todoService;

    private static Stream<Arguments> destinationSortAndExpectOrder() {
        return Stream.of(
                Arguments.of(0, List.of(4L, 1L, 2L, 3L, 5L, 6L, 7L)),
                Arguments.of(6, List.of(1L, 2L, 3L, 5L, 6L, 7L, 4L)),
                Arguments.of(1, List.of(1L, 4L, 2L, 3L, 5L, 6L, 7L)),
                Arguments.of(5, List.of(1L, 2L, 3L, 5L, 6L, 4L, 7L))
        );
    }

    @BeforeEach
    void setUp() {
        final FakePairRoomRepository fakePairRoomRepository = new FakePairRoomRepository();
        final FakeTodoRepository fakeTodoRepository = new FakeTodoRepository();
        final TodoService fakeTodoService = new TodoService(fakePairRoomRepository, fakeTodoRepository);

        this.pairRoomRepository = fakePairRoomRepository;
        this.todoRepository = fakeTodoRepository;
        this.todoService = fakeTodoService;
    }

    @DisplayName("페어룸 아이디, 투두 내용을 입력받으면 Todo 객체를 생성해 저장한다.")
    @Test
    void createTodo() {
        // Given
        final String pairRoomAccessCode = "ACCESS-CODE";
        final PairRoom pairRoom = new PairRoom(
                PairRoomStatus.IN_PROGRESS,
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode(pairRoomAccessCode)
        );
        pairRoomRepository.save(pairRoom);

        final Long pairRoomId = 1L;
        final String content = "켈리 치킨 사주기이이이이이";

        // When
        todoService.createTodo(pairRoomAccessCode, content);

        // Then
        final Optional<Todo> findSavedTodo = todoRepository.findById(1L);
        assertThat(findSavedTodo).isPresent();

        final Todo savedTodo = findSavedTodo.get();
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(savedTodo.getContent().getContent()).isEqualTo(content);
            softAssertions.assertThat(savedTodo.getIsChecked().isChecked()).isFalse();
        });
    }

    @DisplayName("존재하지 않는 페어룸 코드를 입력하면 예외를 발생시킨다.")
    @Test
    void createPairRoomWithNotFoundPairRoomId() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                PairRoomStatus.IN_PROGRESS,
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        pairRoomRepository.save(pairRoom);

        final String pariRoomAccessCode = "code";
        final String content = "켈리 치킨 사주기이이이이이";

        // When & Then
        assertThatThrownBy(() -> todoService.createTodo(pariRoomAccessCode, content))
                .isInstanceOf(PairRoomNotFoundException.class)
                .hasMessage("해당 Access Code의 페어룸은 존재하지 않습니다. - " + pariRoomAccessCode);
    }

    @DisplayName("투두 id와 새로운 투두 내용이 입력되면 해당 투두를 저장소에서 가져와 내용을 변경한뒤 저장한다.")
    @Test
    void updateTodoContent() {
        // Given
        final PairRoom pairRoom = new PairRoom(
                PairRoomStatus.IN_PROGRESS,
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
                PairRoomStatus.IN_PROGRESS,
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
                PairRoomStatus.IN_PROGRESS,
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
                PairRoomStatus.IN_PROGRESS,
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
                PairRoomStatus.IN_PROGRESS,
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

    @DisplayName("저장된 모든 투두를 sort값을 기준으로 오름차순 정렬 후 반환한다.")
    @Test
    void getAll() {
        // Given
        final String pairRoomAccessCode = "ACCESS-CODE";
        final PairRoom pairRoom = new PairRoom(
                PairRoomStatus.IN_PROGRESS,
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode(pairRoomAccessCode)
        );
        pairRoomRepository.save(pairRoom);
        final List<Todo> todos = List.of(
                new Todo(1L, pairRoom, "투두1!!", 5555, false),
                new Todo(2L, pairRoom, "투두2!!", 1024, false),
                new Todo(3L, pairRoom, "투두3!!", 3434, true),
                new Todo(4L, pairRoom, "투두4!!", 2048, false)
        );
        todoRepository.saveAll(todos);

        final int expectSize = 4;
        final List<Long> expectOrder = List.of(2L, 4L, 3L, 1L);

        // When
        final List<Todo> all = todoService.getAllOrderBySort(pairRoomAccessCode);

        // Then
        final List<Long> ids = all.stream().map(Todo::getId).toList();
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(all).hasSize(expectSize);
            softAssertions.assertThat(ids).isEqualTo(expectOrder);
        });
    }

    @DisplayName("존재하지 않은 페어룸 아이디와 함께 투두 리스트 조회 요청을 하면 예외를 발생시킨다.")
    @Test
    void getAllOrderBySortWithNotExistPairRoomId() {
        // Given
        final PairRoom pairRoom = site.coduo.pairroom.repository.PairRoomEntity.builder()
                .id(1L)
                .status(PairRoomStatus.IN_PROGRESS)
                .navigator("A")
                .driver("B")
                .accessCode("ACCESS-CODE")
                .build()
                .toDomain();

        pairRoomRepository.save(pairRoom);
        final List<Todo> todos = List.of(
                new Todo(1L, pairRoom, "투두1!!", 5555, false),
                new Todo(2L, pairRoom, "투두2!!", 1024, false),
                new Todo(3L, pairRoom, "투두3!!", 3434, true),
                new Todo(4L, pairRoom, "투두4!!", 2048, false)
        );
        todoRepository.saveAll(todos);

        final String pairRoomAccessCode = "CODE";

        // When & Then
        assertThatThrownBy(() -> todoService.getAllOrderBySort(pairRoomAccessCode))
                .isInstanceOf(PairRoomNotFoundException.class)
                .hasMessage("해당 Access Code의 페어룸은 존재하지 않습니다. - " + pairRoomAccessCode);
    }

    @DisplayName("대상 투두 아이디와 변경할 순서를 입력받으면 위치를 변경시킨다.")
    @MethodSource("destinationSortAndExpectOrder")
    @ParameterizedTest
    void updateTodoSort(final int destinationSort, final List<Long> expect) {
        // Given
        final PairRoom pairRoom = site.coduo.pairroom.repository.PairRoomEntity.builder()
                .id(1L)
                .status(PairRoomStatus.IN_PROGRESS)
                .navigator("A")
                .driver("B")
                .accessCode("ACCESS-CODE")
                .build()
                .toDomain();

        pairRoomRepository.save(pairRoom);
        final List<Todo> todos = List.of(
                new Todo(1L, pairRoom, "content!", 1024, false),
                new Todo(2L, pairRoom, "content!", 2048, false),
                new Todo(3L, pairRoom, "content!", 3072, false),
                new Todo(4L, pairRoom, "content!", 4000, false),
                new Todo(5L, pairRoom, "content!", 4096, false),
                new Todo(6L, pairRoom, "content!", 5500, false),
                new Todo(7L, pairRoom, "content!", 6000, false)
        );
        todoRepository.saveAll(todos);

        final long targetTodoId = 4L;

        // When
        todoService.updateTodoSort(targetTodoId, destinationSort);

        // Then
        final List<Long> orders = todoRepository.findAllByPairRoomOrderBySortAsc(pairRoom)
                .stream().map(Todo::getId).toList();
        assertThat(orders).isEqualTo(expect);
    }

    @DisplayName("존재하지 않은 페어룸 아이디와 함께 투두 순서 변경 요청을 하면 예외를 발생시킨다.")
    @Test
    void updateTodoSortWithNotExistPairRoomId() {
        // Given
        final PairRoom pairRoom = site.coduo.pairroom.repository.PairRoomEntity.builder()
                .id(1L)
                .status(PairRoomStatus.IN_PROGRESS)
                .navigator("A")
                .driver("B")
                .accessCode("ACCESS-CODE")
                .build()
                .toDomain();

        pairRoomRepository.save(pairRoom);
        final List<Todo> todos = List.of(
                new Todo(1L, pairRoom, "content!", 1024, false),
                new Todo(2L, pairRoom, "content!", 2048, false),
                new Todo(3L, pairRoom, "content!", 3072, false),
                new Todo(4L, pairRoom, "content!", 4000, false),
                new Todo(5L, pairRoom, "content!", 4096, false)
        );
        todoRepository.saveAll(todos);

        final long targetTodoId = 7L;
        final int destinationSort = 3;

        // When & Then
        assertThatThrownBy(() -> todoService.updateTodoSort(targetTodoId, destinationSort))
                .isInstanceOf(TodoNotFoundException.class)
                .hasMessage("존재하지 않은 todo id입니다." + targetTodoId);
    }
}
