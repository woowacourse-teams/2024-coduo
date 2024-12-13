package site.coduo.retrospect.domain;

import lombok.Getter;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;

@Getter
public class RetrospectAnswer {

    private static final int MAXIMUM_CONTENT_LENGTH_LIMIT = 1000;

    private final String value;

    public RetrospectAnswer(final String value) {
        validateValueLength(value);
        this.value = value;
    }

    private void validateValueLength(final String value) {
        if (value == null) {
            return;
        }
        if (value.length() > MAXIMUM_CONTENT_LENGTH_LIMIT) {
            throw new InvalidRetrospectContentException(
                    "회고 답변 길이는 " + MAXIMUM_CONTENT_LENGTH_LIMIT + "자 이하여야 합니다. - " + value.length());
        }
    }
}
