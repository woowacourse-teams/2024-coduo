package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.todo.domain.exception.InvalidTodoArgumentException;

@DisplayName("Todo 도메인 테스트")
class TodoTest {

    @DisplayName("유효한 pairRoom, content, sort 정보를 입력하면 객체를 생성한다.")
    @Test
    void createTodo() {
        // Given
        final Long id = 1L;
        final PairRoom pairRoom = new PairRoom(
                new Pair(new PairName("A"), new PairName("B")),
                new AccessCode("ACCESS-CODE")
        );
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;

        // When
        final Todo todo = new Todo(id, pairRoom, content, sort, isChecked);

        // Then
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(todo).isNotNull();
            softAssertions.assertThat(todo.getId()).isEqualTo(id);
            softAssertions.assertThat(todo.getPairRoom()).isEqualTo(pairRoom);
            softAssertions.assertThat(todo.getContent().getContent()).isEqualTo(content);
            softAssertions.assertThat(todo.getSort().getSort()).isEqualTo(sort);
            softAssertions.assertThat(todo.getIsChecked().isChecked()).isEqualTo(isChecked);
        });
    }

    @DisplayName("pairRomm 정보로 null을 입력하면 예외를 발생시킨다.")
    @Test
    void createTodoWithNullPairRoom() {
        // Given
        final Long id = 1L;
        final PairRoom pairRoom = null;
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;

        // When & Then
        assertThatThrownBy(() -> new Todo(id, pairRoom, content, sort, isChecked))
                .isInstanceOf(InvalidTodoArgumentException.class)
                .hasMessage("Pair Room 정보로 null을 입력할 수 없습니다.");
    }
}
