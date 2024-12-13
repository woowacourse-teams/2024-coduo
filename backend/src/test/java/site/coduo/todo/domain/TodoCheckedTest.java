package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("TodoChecked 도메인 테스트")
class TodoCheckedTest {

    @DisplayName("현재 체크 상태의 토글 값을 가지는 객체를 반환한다.")
    @Test
    void toggle() {
        // Given
        final TodoChecked todoChecked = new TodoChecked(false);

        // When
        final TodoChecked toggled = todoChecked.toggle();

        // Then
        assertThat(toggled.isChecked()).isTrue();
    }
}
