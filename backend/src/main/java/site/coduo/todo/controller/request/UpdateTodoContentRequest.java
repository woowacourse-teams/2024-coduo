package site.coduo.todo.controller.request;

import jakarta.validation.Valid;

public record UpdateTodoContentRequest(@Valid String content) {
}
