package site.coduo.referencelink.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import site.coduo.referencelink.exception.InvalidCategoryException;

class CategoryTest {

    @Test
    @DisplayName("15자 이상인 경우 예외가 발생한다.")
    void validate_category() {
        //given
        final String categoryName = "15자이상인경우예외가발생한다.";

        //when & then
        assertThatThrownBy(() -> new Category(categoryName))
                .isInstanceOf(InvalidCategoryException.class);
    }

    @ParameterizedTest
    @DisplayName("공백을 제거한 후 이름을 저장한다.")
    @ValueSource(strings = {" 스프링", "스프링 ", " 스프링 ", "                    스프링 "})
    void trim_category_name(final String categoryName) {
        // given
        final Category springCategory = new Category("스프링");

        // when
        final Category category = new Category(categoryName);

        // then
        assertThat(category).isEqualTo(springCategory);
    }
}
