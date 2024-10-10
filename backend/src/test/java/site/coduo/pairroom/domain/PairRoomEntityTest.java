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
        assertThatCode(() -> new PairRoom(pairRoomStatus, pair, ACCESS_CODE))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("드리어비와 내비게이터를 변경한한다.")
    void change_nav_and_driver() {
        // given
        final PairRoomEntity sut = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("navi"), new PairName("dri")),
                        new AccessCode("access"))
        );

        // when
        sut.swapNavigatorWithDriver();

        // then
        assertThat(sut)
                .extracting("navigator", "driver")
                .contains("dri", "navi");
    }

    @Test
    @DisplayName("페어룸 상태가 DELETE면 true를 반환한다.")
    void pairRoomEntityStatusIsDelete() {
        // Given
        final PairRoomEntity sut = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.DELETE,
                        new Pair(new PairName("navi"), new PairName("dri")),
                        new AccessCode("access"))
        );

        // When
        final boolean isDelete = sut.isDelete();

        // Then
        assertThat(isDelete).isTrue();
    }

    @Test
    @DisplayName("페어룸 상태가 DELETE가 아니면 false를 반환한다.")
    void pairRoomEntityStatusIsNotDelete() {
        // Given
        final PairRoomEntity sut = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("navi"), new PairName("dri")),
                        new AccessCode("access"))
        );

        // When
        final boolean isDelete = sut.isDelete();

        // Then
        assertThat(isDelete).isFalse();
    }
}
