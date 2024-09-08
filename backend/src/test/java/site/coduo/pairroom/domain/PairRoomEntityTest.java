package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import static site.coduo.fixture.AccessCodeFixture.ACCESS_CODE;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;

class PairRoomEntityTest {

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

    @Test
    @DisplayName("드리어비와 내비게이터를 변경한한다.")
    void change_nav_and_driver() {
        // given
        final PairRoomEntity sut = PairRoomEntity.from(
                new PairRoom(new Pair(new PairName("navi"), new PairName("dri")),
                        PairRoomStatus.IN_PROGRESS, new AccessCode("access")));

        // when
        sut.swapNavigatorWithDriver();

        // then
        assertThat(sut)
                .extracting("navigator", "driver")
                .contains("dri", "navi");
    }
}
