package site.coduo.pairroom.domain;

import java.util.Objects;
import java.util.regex.Pattern;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import site.coduo.pairroom.exception.InvalidNameFormatException;

@Getter
@Embeddable
public class PairName {

    private static final int MAX_LENGTH = 10;
    private static final Pattern VALID_REGEX = Pattern.compile("^[a-zA-Zㄱ-ㅣ가-힣~`!@#$%^&*()_\\-+=\\[\\]{}|;:'\",.<>/?\\s\\p{So}]*$");

    @Column(length = MAX_LENGTH, nullable = false)
    private final String value;

    protected PairName() {
        this.value =  null;
    }

    public PairName(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (StringUtils.isBlank(value)) {
            throw new InvalidNameFormatException("페어의 이름이 비어있습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new InvalidNameFormatException("이름은 10자 이하여야 합니다.");
        }
        if (!isPatternMatch(value)) {
            throw new InvalidNameFormatException("한글, 영어, 특수문자, 이모지가 아닌 문자는 허용하지 않습니다.");
        }
    }

    private boolean isPatternMatch(String value) {
        return VALID_REGEX.matcher(value).matches();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairName pairName = (PairName) o;
        return Objects.equals(value, pairName.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return "PairName{" +
                "value='" + value + '\'' +
                '}';
    }
}
