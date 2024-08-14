package site.coduo.todo.domain;

import lombok.Getter;
import site.coduo.todo.domain.exception.InvalidTodoSortException;

@Getter
public class TodoSort {

    private static final int SORT_INTERVAL = 1024;

    private final int sort;

    public TodoSort(final int sort) {
        validateSort(sort);
        this.sort = sort;
    }

    private void validateSort(final int sort) {
        if (sort < 0) {
            throw new InvalidTodoSortException("todoSort는 음수가 될 수 없습니다.");
        }
    }

    public TodoSort countNextSort() {
        return new TodoSort(sort + SORT_INTERVAL);
    }
}
