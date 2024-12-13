package site.coduo.todo.domain;

import java.util.List;

import lombok.Getter;

@Getter
public class Todo {

    private final Long id;
    private final TodoContent content;
    private final TodoSort sort;
    private final TodoChecked isChecked;

    public Todo(final Long id, final String content, final double sort, final boolean isChecked) {
        this.id = id;
        this.content = new TodoContent(content);
        this.sort = new TodoSort(sort);
        this.isChecked = new TodoChecked(isChecked);
    }

    private Todo(final Long id, final TodoContent content, final TodoSort sort, final TodoChecked isChecked) {
        this.id = id;
        this.content = content;
        this.sort = sort;
        this.isChecked = isChecked;
    }

    public Todo updateContent(final String content) {
        return new Todo(this.id, new TodoContent(content), this.getSort(), this.getIsChecked());
    }

    public Todo toggleTodoChecked() {
        return new Todo(this.id, this.getContent(), this.getSort(), this.getIsChecked().toggle());
    }

    public Todo updateSort(final List<Todo> todos, final int destinationSort) {
        final List<TodoSort> todoSorts = todos.stream()
                .map(Todo::getSort)
                .toList();
        final TodoSort todoSort = this.getSort().update(todoSorts, destinationSort);

        return new Todo(this.id, this.getContent(), todoSort, this.getIsChecked());
    }
}
