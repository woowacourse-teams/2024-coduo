package site.coduo.pairroom.domain;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.Getter;
import site.coduo.pairroom.exception.InvalidPairRoomStatusException;

@Getter
public enum PairRoomStatus {

    IN_PROGRESS,
    COMPLETED,
    DELETED;

    private static final Map<String, PairRoomStatus> STATUS = Arrays.stream(values())
            .collect(Collectors.toMap(PairRoomStatus::name, Function.identity()));

    public static PairRoomStatus findByName(String value) {
        if (STATUS.containsKey(value)) {
            return STATUS.get(value);
        }
        throw new InvalidPairRoomStatusException("페어룸 상태가 존재하지 않습니다.");
    }
}
