package site.coduo.todo.domain;

import java.util.List;
import java.util.Objects;

import lombok.Getter;
import site.coduo.todo.exception.InvalidUpdatedTodoSortException;

@Getter
public class TodoSort {

    private static final int SORT_INTERVAL = 3072;
    private static final int FIRST_ORDER = 0;

    private final double sort;

    public TodoSort(final double sort) {
        this.sort = sort;
    }

    public TodoSort countNextSort() {
        return new TodoSort(sort + SORT_INTERVAL);
    }

    public TodoSort update(final List<TodoSort> todoSorts, final int destinationOrder) {
        validateDestinationOrder(todoSorts, destinationOrder);

        if (destinationOrder == FIRST_ORDER) {
            final double oldFirstItemSortValue = todoSorts.get(FIRST_ORDER).getSort();
            return new TodoSort(oldFirstItemSortValue - SORT_INTERVAL);
        }

        final int lastItemIndex = todoSorts.size() - 1;
        if (destinationOrder == lastItemIndex) {
            final double oldLastItemSortValue = todoSorts.get(lastItemIndex).getSort();
            return new TodoSort(oldLastItemSortValue + SORT_INTERVAL);
        }

        final int currentOrder = todoSorts.indexOf(this);
        if (destinationOrder < currentOrder) {
            final double newSortValue = (todoSorts.get(destinationOrder - 1).sort + todoSorts.get(destinationOrder).sort) / 2;
            return new TodoSort(newSortValue);
        }

        final double newSortValue = (todoSorts.get(destinationOrder).sort + todoSorts.get(destinationOrder + 1).sort) / 2;
        return new TodoSort(newSortValue);
    }

    private void validateDestinationOrder(final List<TodoSort> todoSorts, final int destinationSort) {
        final TodoSort currentSort = todoSorts.stream()
                .filter(todoSort -> todoSort.getSort() == this.sort)
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("입력된 투두 정렬에 현재 정렬값이 포함되어 있지 않습니다."));
        final int currentSortOrder = todoSorts.indexOf(currentSort);

        if (currentSortOrder == destinationSort) {
            throw new IllegalArgumentException("현재 위치로는 이동할 수 없습니다.");
        }

        if (destinationSort < FIRST_ORDER || destinationSort >= todoSorts.size()) {
            throw new InvalidUpdatedTodoSortException(
                    "Todo 순서는 전체 Todo 범위를 벗어나는 위치일 수 없습니다. sort - " + destinationSort);
        }
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final TodoSort todoSort)) {
            return false;
        }
        return sort == todoSort.sort;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(sort);
    }
}
