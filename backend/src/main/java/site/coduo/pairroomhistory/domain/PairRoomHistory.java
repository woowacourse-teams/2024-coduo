package site.coduo.pairroomhistory.domain;

import java.util.Objects;

import lombok.Builder;
import lombok.Getter;
import site.coduo.pairroom.domain.PairRoom;

@Getter
public class PairRoomHistory {

    private final PairRoom pairRoom;
    private final String driver;
    private final String navigator;
    private final Timer timer;

    @Builder
    private PairRoomHistory(
            final PairRoom pairRoom,
            final String driver,
            final String navigator,
            final Timer timer
    ) {
        this.pairRoom = pairRoom;
        this.driver = driver;
        this.navigator = navigator;
        this.timer = timer;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoomHistory that = (PairRoomHistory) o;
        return Objects.equals(pairRoom, that.pairRoom);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pairRoom, driver, navigator, timer);
    }
}
