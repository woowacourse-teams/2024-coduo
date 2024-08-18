package site.coduo.todo.controller.response;

import site.coduo.todo.domain.Todo;

public record GetTodoResponse(
        Long id,
        String content,
        boolean isChecked,
        int order
) {
    public static GetTodoResponse from(final Todo todo, final int order) {
        return new GetTodoResponse(
                todo.getId(),
                todo.getContent().getContent(),
                todo.getIsChecked().isChecked(),
                order
        );
    }
}
