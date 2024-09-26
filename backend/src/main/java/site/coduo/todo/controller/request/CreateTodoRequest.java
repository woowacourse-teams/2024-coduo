package site.coduo.todo.controller.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "투두 항목 생성 요청 바디")
public record CreateTodoRequest(
        @Schema(description = "투두 내용")
        @NotBlank
        String content
) {
}
