package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import site.coduo.retrospect.exception.InvalidRetrospectContentException;

class RetrospectAnswerTest {

    @DisplayName("유효한 회고 답변 값이 입력되면 객체를 생성한다.")
    @Test
    void createObject() {
        // Given
        final String input = "회고 답변!";

        // When
        final RetrospectAnswer retrospectAnswer = new RetrospectAnswer(input);

        // Then
        assertThat(retrospectAnswer).isNotNull();
    }

    @DisplayName("유효하지 않은 회고 답변 값이 입력되면 예외를 발생시킨다.")
    @NullAndEmptySource
    @ParameterizedTest
    void validateValueIsNull(final String input) {
        // When & Then
        assertThatThrownBy(() -> new RetrospectAnswer(input))
                .isInstanceOf(InvalidRetrospectContentException.class)
                .hasMessage("회고 답변 내용으로 null 혹은 공백을 입력할 수 없습니다. - " + input);
    }

    @DisplayName("유효하지 않은 길이의 회고 답변이 입력되면 예외를 발생시킨다.")
    @Test
    void validateValueLength() {
        // Given
        final String input = "A".repeat(1001);

        // When & Then
        assertThatThrownBy(() -> new RetrospectAnswer(input))
                .isInstanceOf(InvalidRetrospectContentException.class)
                .hasMessage("회고 답변 길이는 1000자 이하여야 합니다. - " + input.length());
    }
}
