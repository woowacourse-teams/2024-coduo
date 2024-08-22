package site.coduo.todo.controller.request;

import jakarta.validation.constraints.NotBlank;

public record CreateTodoRequest(@NotBlank String content) {
}
