package site.coduo.referencelink.domain;

import java.util.Objects;

import lombok.Getter;

@Getter
public class Category {

    private final String value;

    public Category(final String value) {
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
        final Category category = (Category) o;
        return Objects.equals(getValue(), category.getValue());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getValue());
    }
}
