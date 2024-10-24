package site.coduo.retrospect.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;

@Getter
public class RetrospectContents {

    private static final int RETROSPECT_CONTENTS_SIZE = 6;

    private final List<RetrospectContent> values;

    public RetrospectContents(final List<RetrospectContent> values) {
        validateValues(values);
        this.values = values;
    }

    private void validateValues(final List<RetrospectContent> values) {
        if (values == null) {
            throw new InvalidRetrospectContentException("회고 문항 내용들로 null을 입력할 수 없습니다.");
        }

        if (values.size() > RETROSPECT_CONTENTS_SIZE) {
            throw new InvalidRetrospectContentException(
                    "회고 내용 개수는 " + RETROSPECT_CONTENTS_SIZE + "개 이하여야 합니다. - " + values.size());
        }
    }

    public static RetrospectContents from(final List<String> answers) {
        validateAnswers(answers);
        final List<RetrospectAnswer> retrospectAnswers = answers.stream().map(RetrospectAnswer::new).toList();
        final List<RetrospectContent> retrospectContents = new ArrayList<>();
        for (int i = 0; i < answers.size(); i++) {
            retrospectContents.add(convertRetrospectContent(retrospectAnswers, i));
        }

        return new RetrospectContents(retrospectContents);
    }

    private static void validateAnswers(final List<String> answers) {
        if (answers == null) {
            throw new InvalidRetrospectContentException("회고 문항 내용 문자열 값들로 null을 입력할 수 없습니다.");
        }
    }

    private static RetrospectContent convertRetrospectContent(final List<RetrospectAnswer> retrospectAnswers,
                                                              final int index) {
        final RetrospectQuestionType retrospectQuestionType = RetrospectQuestionType.findByIndex(index);
        return new RetrospectContent(retrospectQuestionType, retrospectAnswers.get(index));
    }

    public RetrospectContent getFirst() {
        return values.get(0);
    }
}
