package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import site.coduo.retrospect.exception.InvalidRetrospectQuestionTypeException;

class RetrospectQuestionTypeTest {

    @DisplayName("인덱스가 입력되면 대응되는 값을 찾아 반환한다.")
    @MethodSource("inputAndExpect")
    @ParameterizedTest
    void findByIndex(final int index, final RetrospectQuestionType expect) {
        // When
        final RetrospectQuestionType retrospectQuestionType = RetrospectQuestionType.findByIndex(index);

        // Then
        assertThat(retrospectQuestionType).isEqualTo(expect);
    }

    private static Stream<Arguments> inputAndExpect() {
        return Stream.of(
                Arguments.of(0, RetrospectQuestionType.FIRST),
                Arguments.of(1, RetrospectQuestionType.SECOND),
                Arguments.of(2, RetrospectQuestionType.THIRD),
                Arguments.of(3, RetrospectQuestionType.FOURTH)
        );
    }

    @DisplayName("유효하지 않은 인덱스가 입력되면 예외를 발생시킨다.")
    @Test
    void inputInvalidIndex() {
        // Given
        final int input = -1;

        // When & Then
        assertThatThrownBy(() -> RetrospectQuestionType.findByIndex(input))
                .isInstanceOf(InvalidRetrospectQuestionTypeException.class)
                .hasMessage("입력된 인덱스에 일치하는 회고 문항 타입이 존재하지 않습니다. - " + input);
    }
}
