package site.coduo.pairroom.domain;

import java.util.Objects;

import lombok.Getter;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
public class PairRoom {

    private PairRoomStatus status;
    private Pair pair;
    private AccessCode accessCode;

    public PairRoom(final Pair pair, final PairRoomStatus status, final AccessCode accessCode) {
        this.status = status;
        this.pair = pair;
        this.accessCode = accessCode;
    }

    public String getAccessCodeText() {
        return accessCode.getValue();
    }

    public String getFirstPairName() {
        return pair.getFirstPairName();
    }

    public String getSecondPairName() {
        return pair.getSecondPairName();
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
