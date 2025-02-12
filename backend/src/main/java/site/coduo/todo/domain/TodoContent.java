package site.coduo.todo.domain;

import lombok.Getter;
import site.coduo.todo.exception.InvalidTodoContentException;

@Getter
public class TodoContent {

    private static final int MIN_LENGTH = 0;
    private static final int MAX_LENGTH = 255;

    private final String content;

    public TodoContent(final String content) {
        validateContent(content);
        this.content = content;
    }

    private void validateContent(final String content) {
        if (content == null || content.isBlank()) {
            throw new InvalidTodoContentException("투두 아이템 내용이 null이거나 공백일 수 없습니다.");
        }
        if (content.length() < MIN_LENGTH || content.length() > MAX_LENGTH) {
            throw new InvalidTodoContentException("투두의 내용은 %d ~ %d 사이여야 합니다.".formatted(MIN_LENGTH, MAX_LENGTH));
        }
    }
}
