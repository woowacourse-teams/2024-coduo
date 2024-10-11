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
    private final MissionUrl missionUrl;
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

    public String getMissionUrl() {
        return missionUrl.getValue();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final PairRoom pairRoom)) {
            return false;
        }
        return status == pairRoom.status && Objects.equals(pair, pairRoom.pair) && Objects.equals(
                missionUrl, pairRoom.missionUrl) && Objects.equals(accessCode, pairRoom.accessCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, pair, missionUrl, accessCode);
    }

    @Override
    public String toString() {
        return "PairRoom{" +
                "status=" + status +
                ", pair=" + pair +
                ", missionUrl=" + missionUrl +
                ", accessCode=" + accessCode +
                '}';
    }
}
