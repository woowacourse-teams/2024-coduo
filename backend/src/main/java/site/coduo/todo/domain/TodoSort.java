package site.coduo.todo.domain;

import java.util.List;
import java.util.Objects;

import lombok.Getter;
import site.coduo.todo.exception.InvalidUpdatedTodoSortException;

@Getter
public class TodoSort {

    private static final int SORT_INTERVAL = 3072;
    private static final int FIRST_INDEX = 0;

    private final double sort;

    public TodoSort(final double sort) {
        this.sort = sort;
    }

    public TodoSort countNextSort() {
        return new TodoSort(sort + SORT_INTERVAL);
    }

    public TodoSort update(final List<TodoSort> todoSorts, final int destinationOrder) {
        validateUpdateSort(todoSorts.size(), destinationOrder);

        if (destinationOrder == FIRST_INDEX) {
            final double oldFirstItemSortValue = todoSorts.get(FIRST_INDEX).getSort();
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

    private void validateUpdateSort(final int allTodoSize, final int destinationSort) {
        if (destinationSort < FIRST_INDEX || destinationSort >= allTodoSize) {
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
