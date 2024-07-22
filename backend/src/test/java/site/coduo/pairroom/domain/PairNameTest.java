package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.exception.InvalidNameFormatException;

class PairNameTest {

    @Test
    @DisplayName("이름을 생성한다.")
    void create_name() {
        // given
        final String value = "레디";

        // when
        final PairName pairName = new PairName(value);

        // then
        assertThat(pairName.getValue()).isEqualTo(value);
    }

    @Test
    @DisplayName("이름이 10자를 초과하면 예외를 발생시킨다.")
    void throw_exception_when_name_is_over_10_characters() {
        // given
        final String value = "abcdefghijk";

        // when & then
        assertThatThrownBy(() -> new PairName(value))
                .isExactlyInstanceOf(InvalidNameFormatException.class);
    }
}
