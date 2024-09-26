package site.coduo.todo.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateTodoOrderRequest(
        @Schema(description = "투두 변경할 순서")
        int order
) {
}
