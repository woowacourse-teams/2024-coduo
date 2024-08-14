package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import net.bytebuddy.TypeCache.Sort;

import site.coduo.todo.domain.exception.InvalidTodoSortException;

@DisplayName("TodoSort 도메인 테스트")
class TodoSortTest {

    @DisplayName("유효한 sort값을 입력하면 객체를 생성한다.")
    @Test
    void createTodoSort() {
        // Given
        final int input = 2048;

        // When
        final TodoSort created = new TodoSort(input);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(created).isNotNull();
            assertThat(created.getSort()).isEqualTo(input);
        });
    }

    @DisplayName("다음 간격의 sort값 객체를 반환한다.")
    @Test
    void countNextSort() {
        // Given
        final TodoSort todoSort = new TodoSort(1024);
        final int expect = 2048;

        // When
        final TodoSort nextSort = todoSort.countNextSort();

        // Then
        assertSoftly(softAssertions -> {
            assertThat(nextSort).isNotNull();
            assertThat(nextSort.getSort()).isEqualTo(expect);
        });
    }

    @DisplayName("음수값을 입력하면 예외를 발생시킨다.")
    @Test
    void createTodoSortWithNegative() {
        // Given
        final int input = -1;

        // When & Then
        assertThatThrownBy(() -> new TodoSort(input))
                .isInstanceOf(InvalidTodoSortException.class)
                .hasMessage("todoSort는 음수가 될 수 없습니다.");
    }

    @DisplayName("앞/뒤 정렬값이 입력되면 중간 정렬값을 계산 후 객체를 생성해 반환한다.")
    @Test
    void countBetweenSort() {
        // Given
        final TodoSort targetSort = new TodoSort(1024);
        final TodoSort frontSort = new TodoSort(6144);
        final TodoSort backSort = new TodoSort(8192);

        final int expect = 7168;

        // When
        final TodoSort updatedSort = targetSort.countBetweenSort(frontSort, backSort);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(updatedSort).isNotNull();
            assertThat(updatedSort.getSort()).isEqualTo(expect);
        });
    }
}
