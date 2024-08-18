package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import site.coduo.todo.domain.exception.InvalidTodoContentException;

@DisplayName("TodoContent 도메인 테스트")
class TodoContentTest {

    @DisplayName("유효한 투두 내용을 입력하면 객체를 생성한다.")
    @Test
    void createTodo() {
        // Given
        final String content = "켈리 치킨 사주기";

        // When
        final TodoContent created = new TodoContent(content);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(created).isNotNull();
            assertThat(created.getContent()).isEqualTo(content);
        });
    }

    @DisplayName("null 혹은 공백을 입력하면 예외를 발생시킨다.")
    @NullAndEmptySource
    @ParameterizedTest
    void createTodoWithNullOrBlank(final String input) {
        // When & Then
        assertThatThrownBy(() -> new TodoContent(input))
                .isInstanceOf(InvalidTodoContentException.class)
                .hasMessage("투두 아이템 내용이 null이거나 공백일 수 없습니다.");
    }
}
