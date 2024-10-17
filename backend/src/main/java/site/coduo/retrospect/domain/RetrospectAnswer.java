package site.coduo.retrospect.domain;

import lombok.Getter;

@Getter
public class RetrospectAnswer {

    private final String value;

    public RetrospectAnswer(final String value) {
        validateValue(value);
        this.value = value;
    }

    private void validateValue(final String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("회고 답변 내용으로 null 혹은 공백을 입력할 수 없습니다. - " + value);
        }
    }
}
