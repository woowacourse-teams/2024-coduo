package site.coduo.todo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.todo.domain.Todo;
import site.coduo.todo.domain.TodoContent;
import site.coduo.todo.exception.TodoNotFoundException;
import site.coduo.todo.repository.TodoEntity;
import site.coduo.todo.repository.TodoRepository;

@SpringBootTest
@DisplayName("TodoService 테스트")
class TodoServiceTest {

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private PairRoomService pairRoomService;

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private TodoService todoService;

    @AfterEach
    void clean() {
        todoRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }

    @DisplayName("페어룸 아이디, 투두 내용을 입력받으면 Todo 객체를 생성해 저장한다.")
    @Test
    void createTodo() {
        // Given
        final String pairRoomAccessCode = "AC";

        pairRoomService.save(new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));

        final String content = "켈리 치킨 사주기이이이이이";

        // When
        todoService.createTodo(pairRoomAccessCode, content);

        // Then
        final List<TodoEntity> allSaved = todoRepository.findAll();
        assertThat(allSaved).isNotEmpty();

        final Todo savedTodo = allSaved.get(0).toDomain();
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(savedTodo.getContent().getContent()).isEqualTo(content);
            softAssertions.assertThat(savedTodo.getIsChecked().isChecked()).isFalse();
        });
    }

    @DisplayName("존재하지 않는 페어룸 코드를 입력하면 예외를 발생시킨다.")
    @Test
    void createPairRoomWithNotFoundPairRoomId() {
        // Given
        pairRoomService.save(new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));

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
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(null, pairRoomEntity.toDomain(), content, sort, isChecked);
        final TodoEntity todoEntity = new TodoEntity(todo);
        final TodoEntity savedTodo = todoRepository.save(todoEntity);

        final String newContent = "이거슨 새로운 내용!";

        // When
        todoService.updateTodoContent(savedTodo.getId(), newContent);

        // Then
        final Todo findUpdatedTodo = todoRepository.findById(savedTodo.getId())
                .map(TodoEntity::toDomain)
                .orElse(null);
        assertThat(findUpdatedTodo).isNotNull();
        assertThat(findUpdatedTodo.getContent().getContent()).isEqualTo(newContent);
    }

    @DisplayName("존재하지 않은 투두 아이디와 함께 내용 변경 요청을 하면 예외를 발생시킨다.")
    @Test
    void updateTodoContentWithNotFoundTodoId() {
        // Given
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoomEntity.toDomain(), content, sort, isChecked);
        final TodoEntity todoEntity = new TodoEntity(todo);
        todoRepository.save(todoEntity);

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
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(null, pairRoomEntity.toDomain(), content, sort, isChecked);
        final TodoEntity todoEntity = new TodoEntity(todo);
        final TodoEntity savedTodoEntity = todoRepository.save(todoEntity);

        // When
        todoService.toggleTodoChecked(savedTodoEntity.getId());

        // Then
        final Todo findUpdatedTodo = todoRepository.findById(savedTodoEntity.getId())
                .map(TodoEntity::toDomain)
                .orElse(null);
        assertThat(findUpdatedTodo).isNotNull();
        assertThat(findUpdatedTodo.getIsChecked().isChecked()).isTrue();
    }

    @DisplayName("존재하지 않은 투두 id와 함께 토글 요청이 들어오면 예외를 발생시킨다.")
    @Test
    void toggleTodoCheckedWithNotFoundTodoId() {
        // Given
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoomEntity.toDomain(), content, sort, isChecked);
        final TodoEntity todoEntity = new TodoEntity(todo);
        todoRepository.save(todoEntity);

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
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(1L, pairRoomEntity.toDomain(), content, sort, isChecked);
        final TodoEntity todoEntity = new TodoEntity(todo);
        todoRepository.save(todoEntity);

        final Long todoId = 1L;

        // When
        todoService.deleteTodo(todoId);

        // Then
        final Todo findSavedTodo = todoRepository.findById(todoId)
                .map(TodoEntity::toDomain)
                .orElse(null);
        assertThat(findSavedTodo).isNull();
    }

    @DisplayName("저장된 모든 투두를 sort값을 기준으로 오름차순 정렬 후 반환한다.")
    @Test
    void getAll() {
        // Given
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final PairRoom savedPairRoom = pairRoomEntity.toDomain();

        final List<Todo> todos = List.of(
                new Todo(null, savedPairRoom, "투두1!!", 5555, false),
                new Todo(null, savedPairRoom, "투두2!!", 1024, false),
                new Todo(null, savedPairRoom, "투두3!!", 3434, true),
                new Todo(null, savedPairRoom, "투두4!!", 2048, false)
        );
        final List<TodoEntity> todoEntities = todos.stream()
                .map(TodoEntity::new)
                .toList();
        todoRepository.saveAll(todoEntities);

        final int expectSize = 4;
        final List<String> expectOrder = List.of("투두2!!", "투두4!!", "투두3!!", "투두1!!");

        // When
        final List<Todo> all = todoService.getAllOrderBySort(accessCode);

        // Then
        final List<String> contents = all.stream()
                .map(Todo::getContent)
                .map(TodoContent::getContent)
                .toList();
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(all).hasSize(expectSize);
            softAssertions.assertThat(contents).isEqualTo(expectOrder);
        });
    }

    @DisplayName("존재하지 않은 페어룸 아이디와 함께 투두 리스트 조회 요청을 하면 예외를 발생시킨다.")
    @Test
    void getAllOrderBySortWithNotExistPairRoomId() {
        // Given
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();

        final PairRoom savedPairRoom = pairRoomEntity.toDomain();

        final List<Todo> todos = List.of(
                new Todo(null, savedPairRoom, "투두1!!", 5555, false),
                new Todo(null, savedPairRoom, "투두2!!", 1024, false),
                new Todo(null, savedPairRoom, "투두3!!", 3434, true),
                new Todo(null, savedPairRoom, "투두4!!", 2048, false)
        );
        final List<TodoEntity> todoEntities = todos.stream()
                .map(TodoEntity::new)
                .toList();
        todoRepository.saveAll(todoEntities);

        final String pairRoomAccessCode = "CODE";

        // When & Then
        assertThatThrownBy(() -> todoService.getAllOrderBySort(pairRoomAccessCode))
                .isInstanceOf(PairRoomNotFoundException.class)
                .hasMessage("해당 Access Code의 페어룸은 존재하지 않습니다. - " + pairRoomAccessCode);
    }

    @DisplayName("대상 투두 아이디와 변경할 순서를 입력받으면 위치를 변경시킨다.")
    @MethodSource("destinationSortAndExpectOrder")
    @ParameterizedTest
    void updateTodoSort(final int destinationSort, final List<String> expect) {
        // Given

        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();
        final PairRoom savedPairRoom = pairRoomEntity.toDomain();

        final List<Todo> todos = List.of(
                new Todo(null, savedPairRoom, "content1!", 1024, false),
                new Todo(null, savedPairRoom, "content2!", 2048, false),
                new Todo(null, savedPairRoom, "content3!", 3072, false),
                new Todo(null, savedPairRoom, "content4!", 4000, false),
                new Todo(null, savedPairRoom, "content5!", 4096, false),
                new Todo(null, savedPairRoom, "content6!", 5500, false),
                new Todo(null, savedPairRoom, "content7!", 6000, false)
        );
        final List<TodoEntity> todoEntities = todos.stream()
                .map(TodoEntity::new)
                .toList();
        final List<TodoEntity> savedTodos = todoRepository.saveAll(todoEntities);

        final Long targetTodoId = savedTodos.get(3).getId();

        // When
        todoService.updateTodoSort(targetTodoId, destinationSort);

        // Then
        final List<String> orders = todoRepository.findAllByPairRoomEntityOrderBySortAsc(pairRoomEntity)
                .stream()
                .map(TodoEntity::toDomain)
                .map(Todo::getContent)
                .map(TodoContent::getContent)
                .toList();
        assertThat(orders).isEqualTo(expect);
    }

    private static Stream<Arguments> destinationSortAndExpectOrder() {
        return Stream.of(
                Arguments.of(0, List.of("content4!", "content1!", "content2!", "content3!", "content5!", "content6!",
                        "content7!")),
                Arguments.of(6, List.of("content1!", "content2!", "content3!", "content5!", "content6!", "content7!",
                        "content4!")),
                Arguments.of(1, List.of("content1!", "content4!", "content2!", "content3!", "content5!", "content6!",
                        "content7!")),
                Arguments.of(5, List.of("content1!", "content2!", "content3!", "content5!", "content6!", "content4!",
                        "content7!"))
        );
    }

    @DisplayName("존재하지 않은 페어룸 아이디와 함께 투두 순서 변경 요청을 하면 예외를 발생시킨다.")
    @Test
    void updateTodoSortWithNotExistPairRoomId() {
        // Given
        final String accessCode = pairRoomService.save(
                new PairRoomCreateRequest("A", "B", 60_000, 60_000, "IN_PROGRESS"));
        final PairRoomEntity pairRoomEntity = pairRoomRepository.findByAccessCode(accessCode).get();
        final PairRoom savedPairRoom = pairRoomEntity.toDomain();

        final List<Todo> todos = List.of(
                new Todo(null, savedPairRoom, "content!", 1024, false),
                new Todo(null, savedPairRoom, "content!", 2048, false),
                new Todo(null, savedPairRoom, "content!", 3072, false),
                new Todo(null, savedPairRoom, "content!", 4000, false),
                new Todo(null, savedPairRoom, "content!", 4096, false)
        );
        final List<TodoEntity> todoEntities = todos.stream()
                .map(TodoEntity::new)
                .toList();
        todoRepository.saveAll(todoEntities);

        final long targetTodoId = 70000L;
        final int destinationSort = 3;

        // When & Then
        assertThatThrownBy(() -> todoService.updateTodoSort(targetTodoId, destinationSort))
                .isInstanceOf(TodoNotFoundException.class)
                .hasMessage("존재하지 않은 todo id입니다." + targetTodoId);
    }
}
