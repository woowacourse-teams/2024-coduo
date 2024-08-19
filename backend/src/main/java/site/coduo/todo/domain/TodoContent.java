package site.coduo.todo.domain;

import lombok.Getter;
import site.coduo.todo.exception.InvalidTodoContentException;

@Getter
public class TodoContent {

    private final String content;

    public TodoContent(final String content) {
        validateContent(content);
        this.content = content;
    }

    private void validateContent(final String content) {
        if (content == null || content.isBlank()) {
            throw new InvalidTodoContentException("투두 아이템 내용이 null이거나 공백일 수 없습니다.");
        }
    }
}
