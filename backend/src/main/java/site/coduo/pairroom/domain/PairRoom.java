package site.coduo.pairroom.domain;

import java.util.Objects;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
@RequiredArgsConstructor
public class PairRoom {

    private final PairRoomStatus status;
    private final Pair pair;
    private final AccessCode accessCode;

    public String getAccessCodeText() {
        return accessCode.getValue();
    }

    public String getNavigatorName() {
        return pair.getNavigatorName();
    }

    public String getDriverName() {
        return pair.getDriverName();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoom pairRoom = (PairRoom) o;
        return status == pairRoom.status && Objects.equals(pair, pairRoom.pair) && Objects.equals(
                accessCode, pairRoom.accessCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, pair, accessCode);
    }

    @Override
    public String toString() {
        return "PairRoom{" +
                "status=" + status +
                ", pair=" + pair +
                ", accessCode=" + accessCode +
                '}';
    }
}
