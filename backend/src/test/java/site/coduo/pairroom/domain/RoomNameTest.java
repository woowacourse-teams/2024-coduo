package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;

import site.coduo.pairroom.exception.InvalidRoomNameFormatException;

public class RoomNameTest {

    @Test
    @DisplayName("방 이름이 35자를 초과하면 예외를 발생시킨다.")
    void throw_exception_when_pair_room_name_is_over_35_characters() {
        // given
        final String invalidName = "123456789012345678901234567890123456";

        // when & then
        assertThatThrownBy(() -> new RoomName(invalidName))
                .isExactlyInstanceOf(InvalidRoomNameFormatException.class);
    }

    @Test
    @DisplayName("방 이름 앞 뒤 공백은 삭제된다.")
    void trim_front_and_end_blank() {
        // given
        final String name = " pair room ";

        // when
        final RoomName pairName = new RoomName(name);

        // then
        assertThat(pairName.getValue()).isEqualTo("pair room");
    }

    @Test
    @DisplayName("공백이 제거 된 후 35 글자 이하 방 이름은 허용한다.")
    void allow_35_characters_with_trim_room_name_length() {
        // given
        final String name = "    12345678901234567890123456789012345   ";

        // when
        final RoomName pairName = new RoomName(name);

        // then
        assertThat(pairName.getValue()).isEqualTo("12345678901234567890123456789012345");
    }

    @ParameterizedTest
    @NullAndEmptySource
    @DisplayName("방 이름 생성 시 빈 이름이 입력되면 예외를 발생시킨다.")
    void throw_exception_when_create_room_name_with_blank_parameters(final String name) {
        assertThatThrownBy(() -> new RoomName(name))
                .isInstanceOf(InvalidRoomNameFormatException.class);
    }

    @DisplayName("'의 페어룸'을 붙여 방 이름 기본값을 만든다.")
    @Test
    void make_default_pair_room_name() {
        //given
        final String name = "잉크와 파슬리";

        //when
        final RoomName defaultRoomName = RoomName.makeDefaultRoomNameFrom(name);

        //then
        assertThat(defaultRoomName.getValue()).isEqualTo("잉크와 파슬리의 페어룸");
    }
}
