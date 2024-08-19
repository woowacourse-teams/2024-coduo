package site.coduo.todo.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import site.coduo.todo.exception.InvalidTodoSortException;
import site.coduo.todo.exception.InvalidUpdatedTodoSortException;

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

    @DisplayName("첫 번째 위치로 이동할경우 기존 첫 번째 아이템의 정렬값에서 아이템 간격 만큼을 뺀 값으로 정렬값을 변경한다.")
    @Test
    void updateSortToFirst() {
        // Given
        final TodoSort targetSort = new TodoSort(2048);

        final List<TodoSort> todoSorts = List.of(
                new TodoSort(1024),
                new TodoSort(2048),
                new TodoSort(3072),
                new TodoSort(4096)
        );
        final int destinationSort = 0;

        final int expect = 0;

        // When
        final TodoSort updatedSort = targetSort.update(todoSorts, destinationSort);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(updatedSort).isNotNull();
            assertThat(updatedSort.getSort()).isEqualTo(expect);
        });
    }

    @DisplayName("마지막 위치로 이동할경우 기존 마지막 아이템의 정렬값에서 아이템 간격 만큼을 더한 값으로 정렬값을 변경한다.")
    @Test
    void updateSortToLast() {
        // Given
        final TodoSort targetSort = new TodoSort(2048);

        final List<TodoSort> todoSorts = List.of(
                new TodoSort(1024),
                new TodoSort(2048),
                new TodoSort(3072),
                new TodoSort(4096)
        );
        final int destinationSort = 3;

        final int expect = 5120;

        // When
        final TodoSort updatedSort = targetSort.update(todoSorts, destinationSort);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(updatedSort).isNotNull();
            assertThat(updatedSort.getSort()).isEqualTo(expect);
        });
    }

    @DisplayName("다른 아이템 사이로 이동할경우 앞/뒤 아이템의 정렬값을 더한 값에서 2로 나눈 값으로 정렬값을 변경한다.")
    @Test
    void updateSortBetweenItems() {
        // Given
        final TodoSort targetSort = new TodoSort(2048);

        final List<TodoSort> todoSorts = List.of(
                new TodoSort(1024),
                new TodoSort(2048),
                new TodoSort(3072),
                new TodoSort(4000),
                new TodoSort(4096)
        );
        final int destinationSort = 3;

        final int expect = 4048;

        // When
        final TodoSort updatedSort = targetSort.update(todoSorts, destinationSort);

        // Then
        assertSoftly(softAssertions -> {
            assertThat(updatedSort).isNotNull();
            assertThat(updatedSort.getSort()).isEqualTo(expect);
        });
    }

    @DisplayName("전체 투두 아이템 범위를 벗어나는 위치로 이동하려하면 예외를 발생시킨다.")
    @ValueSource(ints = {-1, 6})
    @ParameterizedTest
    void updateToOutOfRange(final int destinationSort) {
        // Given
        final TodoSort targetSort = new TodoSort(2048);

        final List<TodoSort> todoSorts = List.of(
                new TodoSort(1024),
                new TodoSort(2048),
                new TodoSort(3072),
                new TodoSort(4000),
                new TodoSort(4096)
        );

        // When & Then
        assertThatThrownBy(() -> targetSort.update(todoSorts, destinationSort))
                .isInstanceOf(InvalidUpdatedTodoSortException.class)
                .hasMessage("Todo 순서는 전체 Todo 범위를 벗어나는 위치일 수 없습니다. sort - " + destinationSort);
    }
}
