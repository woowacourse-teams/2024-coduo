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
}
