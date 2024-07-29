package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import site.coduo.pairroom.exception.InvalidNameFormatException;

class PairNameTest {

    @ParameterizedTest
    @ValueSource(strings = {"레디!", "파슬리 🌿", "여 왕 님", "lemon", "abcdeabcde"})
    @DisplayName("한글, 한글 자음 & 모음, 영어, 기호, 이모지가 들어간 이름을 생성한다.")
    void create_name_contains_special_character(final String validName) {
        // given & when
        final PairName pairName = new PairName(validName);

        // then
        assertThat(pairName.getValue()).isEqualTo(validName);
    }

    @Test
    @DisplayName("이름이 10자를 초과하면 예외를 발생시킨다.")
    void throw_exception_when_name_is_over_10_characters() {
        // given
        final String invalidName = "abcdeabcdef";

        // when & then
        assertThatThrownBy(() -> new PairName(invalidName))
                .isExactlyInstanceOf(InvalidNameFormatException.class);
    }

    @Test
    @DisplayName("이름 앞 뒤 공백은 삭제된다.")
    void trim_front_and_end_blank() {
        // given
        final String name = " h e ll o ";

        // when
        final PairName pairName = new PairName(name);

        // then
        assertThat(pairName.getValue()).isEqualTo("h e ll o");
    }

    @Test
    @DisplayName("공백이 제거 된 후 10 글자 이하 닉네임은 허용한다.")
    void allow_10_characters_with_trim_name_length() {
        // given
        final String name = "    helloWorld   ";

        // when
        final PairName pairName = new PairName(name);

        // then
        assertThat(pairName.getValue()).isEqualTo("helloWorld");
    }


    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("페어룸 생성 시 빈 이름이 입력되면 예외를 발생시킨다.")
    void throw_exception_when_create_pair_room_with_blank_parameters(final String name) {
        assertThatThrownBy(() -> new PairName(name))
                .isInstanceOf(InvalidNameFormatException.class);
    }
}
