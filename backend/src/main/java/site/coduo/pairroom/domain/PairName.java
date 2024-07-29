package site.coduo.pairroom.domain;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import site.coduo.pairroom.exception.InvalidNameFormatException;

@Getter
@Embeddable
public class PairName {

    private static final int MAX_LENGTH = 10;

    @Column(length = MAX_LENGTH, nullable = false)
    private final String value;

    protected PairName() {
        this.value =  null;
    }

    public PairName(final String value) {
        validate(value);
        this.value = value.trim();
    }

    private void validate(final String value) {
        if (StringUtils.isBlank(value)) {
            throw new InvalidNameFormatException("페어의 이름이 비어있습니다.");
        }
        if (value.trim().length() > MAX_LENGTH) {
            throw new InvalidNameFormatException(String.format("이름은 %d자 이하여야 합니다.", MAX_LENGTH));
        }
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
