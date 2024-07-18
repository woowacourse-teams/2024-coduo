package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import site.coduo.pairroom.exception.InvalidNameFormatException;

class PairRoomTest {

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final String firstName = "first";
        final String secondName = "second";

        // when & then
        assertThatCode(() -> new PairRoom(new PairName(firstName), new PairName(secondName)))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("페어룸 생성 시 빈 이름이 입력되면 예외를 발생시킨다.")
    void throw_exception_when_create_pair_room_with_blank_parameters(final String name) {
        assertThatThrownBy(() -> new PairRoom(new PairName(name), new PairName(name)))
                .isInstanceOf(InvalidNameFormatException.class);
    }
}
