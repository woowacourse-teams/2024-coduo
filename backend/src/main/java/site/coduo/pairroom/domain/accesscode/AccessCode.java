package site.coduo.pairroom.domain.accesscode;


import static site.coduo.pairroom.domain.accesscode.AccessCodeStrategy.ACCESS_CODE_LENGTH;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class AccessCode {

    @Column(name = "ACCESS_CODE", length = ACCESS_CODE_LENGTH, nullable = false)
    private String value;

    public AccessCode(final String value) {
        this.value = value;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AccessCode that = (AccessCode) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }
}
