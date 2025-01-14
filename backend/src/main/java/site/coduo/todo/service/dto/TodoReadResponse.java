package site.coduo.todo.service.dto;

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
}
