package site.coduo.retrospect.domain;

import lombok.Getter;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;

@Getter
public class RetrospectContent {

    private final RetrospectQuestionType questionType;
    private final RetrospectAnswer answer;

    public RetrospectContent(final RetrospectQuestionType questionType, final RetrospectAnswer answer) {
        validateQuestionType(questionType);
        validateAnswer(answer);

        this.answer = answer;
        this.questionType = questionType;
    }

    private void validateQuestionType(final RetrospectQuestionType questionType) {
        if (questionType == null) {
            throw new InvalidRetrospectContentException("회고 문항 유형 객체로 null이 입력될 수 없습니다.");
        }
    }

    private void validateAnswer(final RetrospectAnswer answer) {
        if (answer == null) {
            throw new InvalidRetrospectContentException("회고 답변 객체로 null을 입력할 수 없습니다.");
        }
    }
}
