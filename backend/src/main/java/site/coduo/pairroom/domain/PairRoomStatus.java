package site.coduo.pairroom.domain;

import java.util.Arrays;

import lombok.Getter;
import site.coduo.pairroom.exception.PairRoomStatusNotFoundException;

@Getter
public enum PairRoomStatus {

    ONBOARDING,
    IN_PROGRESS,
    COMPLETED;

    public static PairRoomStatus findByName(String value) {
        return Arrays.stream(PairRoomStatus.values())
                .filter(status -> status.name().equals(value))
                .findFirst()
                .orElseThrow(() -> new PairRoomStatusNotFoundException("페어룸 상태가 존재하지 않습니다."));
    }
}
