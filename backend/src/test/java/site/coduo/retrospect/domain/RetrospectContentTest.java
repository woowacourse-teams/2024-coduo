package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.retrospect.exception.InvalidRetrospectContentException;

class RetrospectContentTest {

    @DisplayName("유효한 회고 문항 유형, 답변이 입력되면 객체를 생성한다.")
    @Test
    void createObject() {
        // Given
        final RetrospectQuestionType retrospectQuestionType = RetrospectQuestionType.FIRST;
        final RetrospectAnswer retrospectAnswer = new RetrospectAnswer("hi");

        // When
        final RetrospectContent retrospectContent = new RetrospectContent(retrospectQuestionType, retrospectAnswer);

        // Then
        assertThat(retrospectContent).isNotNull();
    }

    @DisplayName("회고 문항으로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void inputNullForRetrospectQuestionType() {
        // Given
        final RetrospectAnswer retrospectAnswer = new RetrospectAnswer("hi");

        // When & Then
        assertThatThrownBy(() -> new RetrospectContent(null, retrospectAnswer))
                .isInstanceOf(InvalidRetrospectContentException.class)
                .hasMessage("회고 문항 유형 객체로 null이 입력될 수 없습니다.");
    }

    @DisplayName("회고 답변으로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void inputNullForRetrospectAnswer() {
        // Given
        final RetrospectQuestionType retrospectQuestionType = RetrospectQuestionType.FIRST;

        // When & Then
        assertThatThrownBy(() -> new RetrospectContent(retrospectQuestionType, null))
                .isInstanceOf(InvalidRetrospectContentException.class)
                .hasMessage("회고 답변 객체로 null을 입력할 수 없습니다.");
    }
}
