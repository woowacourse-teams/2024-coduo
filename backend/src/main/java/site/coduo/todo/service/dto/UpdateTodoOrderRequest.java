package site.coduo.todo.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateTodoOrderRequest(
        @Schema(description = "투두 변경할 순서")
        int order
) {
}
