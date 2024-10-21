package site.coduo.retrospect.domain;

import java.util.Arrays;

import lombok.Getter;
import site.coduo.retrospect.exception.InvalidRetrospectQuestionTypeException;

@Getter
public enum RetrospectQuestionType {
    FIRST(0),
    SECOND(1),
    THIRD(2),
    FOURTH(3),
    ;

    private final int index;

    RetrospectQuestionType(final int index) {
        this.index = index;
    }

    public static RetrospectQuestionType findByIndex(final int index) {
        return Arrays.stream(RetrospectQuestionType.values())
                .filter(type -> type.getIndex() == index)
                .findAny()
                .orElseThrow(() -> new InvalidRetrospectQuestionTypeException("입력된 인덱스에 일치하는 회고 문항 타입이 존재하지 않습니다. - " + index));
    }
}
