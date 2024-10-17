package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RetrospectContentsTest {

    @DisplayName("유효한 회고 내용 값들을 입력하면 객체를 생성한다.")
    @Test
    void createObject() {
        // Given
        final List<RetrospectContent> input = List.of(
                new RetrospectContent(RetrospectQuestionType.FIRST, new RetrospectAnswer("답변1")),
                new RetrospectContent(RetrospectQuestionType.SECOND, new RetrospectAnswer("답변2")),
                new RetrospectContent(RetrospectQuestionType.THIRD, new RetrospectAnswer("답변3")),
                new RetrospectContent(RetrospectQuestionType.FOURTH, new RetrospectAnswer("답변4"))
        );

        // When
        final RetrospectContents retrospectContents = new RetrospectContents(input);

        // Then
        assertThat(retrospectContents).isNotNull();
    }

    @DisplayName("회고 내용 값들로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void validateRetrospectContentsIsNull() {
        // When & Then
        assertThatThrownBy(() -> new RetrospectContents(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("회고 문항 내용들로 null을 입력할 수 없습니다.");
    }

    @DisplayName("유효하지 않은 개수의 회고 내용 값들이 입력되면 예외를 발생시킨다.")
    @Test
    void validateRetrospectContentsSize() {
        // Given
        final List<RetrospectContent> input = List.of(
                new RetrospectContent(RetrospectQuestionType.FIRST, new RetrospectAnswer("답변1")),
                new RetrospectContent(RetrospectQuestionType.SECOND, new RetrospectAnswer("답변2"))
        );

        // When & Then
        assertThatThrownBy(() -> new RetrospectContents(input))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("회고 내용 개수는 4개여야 합니다. - " + input.size());
    }

    @DisplayName("유효한 회고 내용 문자열 값들이 입력되면 객체를 생성한다.")
    @Test
    void createObjectOfRetrospectContentStrings() {
        // Given
        final List<String> input = List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4");

        // When
        final RetrospectContents retrospectContents = RetrospectContents.of(input);

        // Then
        assertThat(retrospectContents).isNotNull();
    }

    @DisplayName("회고 내용 문자열 값들로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void validateRetrospectContentStringsIsNull() {
        // When & Then
        assertThatThrownBy(() -> RetrospectContents.of(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("회고 문항 내용 문자열 값들로 null을 입력할 수 없습니다.");
    }
}
