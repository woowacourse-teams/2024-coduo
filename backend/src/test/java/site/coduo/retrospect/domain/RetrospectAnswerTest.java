package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

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
    void validateValue(final String input) {
        // When & Then
        assertThatThrownBy(() -> new RetrospectAnswer(input))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("회고 답변 내용으로 null 혹은 공백을 입력할 수 없습니다. - " + input);
    }
}
