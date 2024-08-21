package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import static site.coduo.fixture.AccessCodeFixture.ACCESS_CODE;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PairRoomTest {

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final String firstName = "first";
        final String secondName = "second";
        final Pair pair = new Pair(new PairName(firstName), new PairName(secondName));
        final PairRoomStatus pairRoomStatus = PairRoomStatus.IN_PROGRESS;

        // when & then
        assertThatCode(() -> new PairRoom(pair, pairRoomStatus, ACCESS_CODE))
                .doesNotThrowAnyException();
    }
}
