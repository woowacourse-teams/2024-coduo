package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import site.coduo.pairroom.exception.InvalidNameFormatException;

class PairNameTest {

    @ParameterizedTest
    @ValueSource(strings = {"레디!", "파슬리 🌿", "ㄹ ㅔ ㅁ ㄴ ㅔ", "lemone"})
    @DisplayName("한글, 한글 자음 & 모음, 영어, 기호, 이모지가 들어간 이름을 생성한다.")
    void create_name_contains_special_character(String validName) {
        // given & when
        final PairName pairName = new PairName(validName);

        // then
        assertThat(pairName.getValue()).isEqualTo(validName);
    }

    @Test
    @DisplayName("이름이 10자를 초과하면 예외를 발생시킨다.")
    void throw_exception_when_name_is_over_10_characters() {
        // given
        final String invalidName = "abcdefghijk";

        // when & then
        assertThatThrownBy(() -> new PairName(invalidName))
                .isExactlyInstanceOf(InvalidNameFormatException.class);
    }

    @Test
    @DisplayName("이름에 한글, 영어가 아닌 언어가 존재하면 예외를 발생시킨다.")
    void throw_exception_when_name_contains_non_korean_and_non_english() {
        // given
        final String invalidName = "號 이름";

        // when & then
        assertThatThrownBy(() -> new PairName(invalidName))
                .isExactlyInstanceOf(InvalidNameFormatException.class);
    }
}
