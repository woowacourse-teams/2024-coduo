package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Todo 도메인 테스트")
class TodoTest {

    @DisplayName("유효한 content, sort 정보를 입력하면 객체를 생성한다.")
    @Test
    void createTodo() {
        // Given
        final Long id = 1L;
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;

        // When
        final Todo todo = new Todo(id, content, sort, isChecked);

        // Then
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(todo).isNotNull();
            softAssertions.assertThat(todo.getId()).isEqualTo(id);
            softAssertions.assertThat(todo.getContent().getContent()).isEqualTo(content);
            softAssertions.assertThat(todo.getSort().getSort()).isEqualTo(sort);
            softAssertions.assertThat(todo.getIsChecked().isChecked()).isEqualTo(isChecked);
        });
    }

    @DisplayName("새로운 content가 입력되면 해당 content를 가진 Todo 객체를 반환한다.")
    @Test
    void updateContent() {
        // Given
        final Long id = 1L;
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(id, content, sort, isChecked);

        final String newContent = "이거슨 새로운 내용!";

        // When
        final Todo updatedTodo = todo.updateContent(newContent);

        // Then
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(updatedTodo).isNotNull();
            softAssertions.assertThat(updatedTodo.getContent().getContent()).isEqualTo(newContent);
        });
    }

    @DisplayName("투두 체크 상태 토글 요청이 오면 토글된 체크 상태를 가지는 Todo 객체를 반환한다.")
    @Test
    void toggleTodoChecked() {
        // Given
        final Long id = 1L;
        final String content = "content!";
        final int sort = 2048;
        final boolean isChecked = false;
        final Todo todo = new Todo(id, content, sort, isChecked);

        // When
        final Todo updated = todo.toggleTodoChecked();

        // Then
        assertSoftly(softAssertions -> {
            softAssertions.assertThat(updated).isNotNull();
            softAssertions.assertThat(updated.getIsChecked().isChecked()).isTrue();
        });
    }

    @DisplayName("전체 투두 아이템들과 변경할 순서 위치가 입력되면 변경된 순서의 투두를 반환한다.")
    @Test
    void updateSort() {
        // Given
        final Todo todo = new Todo(
                1L,
                "content!",
                2048,
                false
        );

        final List<Todo> todos = List.of(
                new Todo(1L, "content!", 1024, false),
                new Todo(1L, "content!", 2048, false),
                new Todo(1L, "content!", 3072, false),
                new Todo(1L, "content!", 4000, false),
                new Todo(1L, "content!", 4096, false)
        );
        final int destinationSort = 3;

        final int expect = 4048;

        // When
        final Todo updated = todo.updateSort(todos, destinationSort);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(updated).isNotNull();
            assertThat(updated.getSort().getSort()).isEqualTo(expect);
        });
    }
}
