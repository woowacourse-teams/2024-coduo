package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.exception.InvalidPairRoomStatusException;

class PairRoomStatusTest {

    @Test
    @DisplayName("페어룸 상태 이름으로 페어룸 상태 enum을 찾아 반환한다.")
    void find_pair_room_status_by_name() {
        // given
        final String pairRoomStatusName = "IN_PROGRESS";

        // when
        final PairRoomStatus pairRoomStatus = PairRoomStatus.findByName(pairRoomStatusName);

        // then
        assertThat(pairRoomStatus).isEqualTo(PairRoomStatus.IN_PROGRESS);
    }

    @Test
    @DisplayName("페어룸 상태 이름이 enum에 존재하지 않을 경우 예외가 발생한다.")
    void throw_exception_when_pair_room_status_name_not_exist() {
        // given
        final String pairRoomStatusName = "NOT_EXIST";

        // when & then
        assertThatThrownBy(() -> PairRoomStatus.findByName(pairRoomStatusName))
                .isInstanceOf(InvalidPairRoomStatusException.class);
    }
}
