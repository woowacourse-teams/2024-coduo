package site.coduo.todo.service.dto;

import java.util.List;
import java.util.stream.IntStream;

import site.coduo.todo.domain.Todo;

public record TodoReadResponse(
        Long id,
        String content,
        boolean isChecked,
        int order
) {
    public static TodoReadResponse from(final Todo todo, final int order) {
        return new TodoReadResponse(
                todo.getId(),
                todo.getContent().getContent(),
                todo.getIsChecked().isChecked(),
                order
        );
    }

    public static List<TodoReadResponse> of(List<Todo> todos) {
        return IntStream.range(0, todos.size())
                .mapToObj(index -> TodoReadResponse.from(todos.get(index), index))
                .toList();
    }
}
