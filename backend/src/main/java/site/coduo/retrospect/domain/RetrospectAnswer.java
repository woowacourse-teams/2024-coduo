package site.coduo.retrospect.domain;

import lombok.Getter;

@Getter
public class RetrospectAnswer {

    private static final int MAXIMUM_CONTENT_LENGTH_LIMIT = 1000;

    private final String value;

    public RetrospectAnswer(final String value) {
        validateValueIsNull(value);
        validateValueLength(value);
        this.value = value;
    }

    private void validateValueIsNull(final String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("회고 답변 내용으로 null 혹은 공백을 입력할 수 없습니다. - " + value);
        }
    }

    private void validateValueLength(final String value) {
        if (value.length() > MAXIMUM_CONTENT_LENGTH_LIMIT) {
            throw new IllegalArgumentException("회고 답변 길이는 " + MAXIMUM_CONTENT_LENGTH_LIMIT + "자 이하여야 합니다. - " + value.length());
        }
    }
}
