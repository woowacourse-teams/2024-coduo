package site.coduo.todo.controller.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateTodoContentRequest(
        @Schema(description = "투두 변경할 내용")
        @NotBlank
        @Valid
        String content
) {
}
