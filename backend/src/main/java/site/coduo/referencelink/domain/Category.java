package site.coduo.referencelink.domain;

import java.util.Objects;

import lombok.Getter;
import site.coduo.referencelink.exception.InvalidCategoryException;

@Getter
public class Category {

    private static final int CATEGORY_NAME_MAX_LENGTH = 15;

    private final String value;

    public Category(final String value) {
        validate(value);
        this.value = value.trim();
    }

    private void validate(final String value) {
        if (value == null || value.isBlank()) {
            throw new InvalidCategoryException("카테고리 값이 비어 있습니다.");
        }

        if (value.trim().length() > CATEGORY_NAME_MAX_LENGTH) {
            throw new InvalidCategoryException("카테고리 길이는 " + CATEGORY_NAME_MAX_LENGTH + "자 이하여야 합니다.");
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
        final Category category = (Category) o;
        return Objects.equals(getValue(), category.getValue());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getValue());
    }
}
