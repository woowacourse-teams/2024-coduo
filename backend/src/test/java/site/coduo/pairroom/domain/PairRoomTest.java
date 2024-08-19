package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.accesscode.AccessCode;

class PairRoomTest {

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final String firstName = "first";
        final String secondName = "second";
        final Pair pair = new Pair(new PairName(firstName), new PairName(secondName));
        final PairRoomStatus pairRoomStatus = PairRoomStatus.ONBOARDING;

        // when & then
        assertThatCode(() -> new PairRoom(pair, pairRoomStatus, new AccessCode("code")))
                .doesNotThrowAnyException();
    }
}
