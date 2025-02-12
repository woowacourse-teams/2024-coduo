package site.coduo.pairroom.domain;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.exception.InvalidPairRoomStatusException;

@RequiredArgsConstructor
@Getter
public enum PairRoomStatus {

    IN_PROGRESS("in_progress"),
    COMPLETED("completed"),
    DELETED("deleted");

    private static final Map<String, PairRoomStatus> STATUS = Arrays.stream(values())
            .collect(Collectors.toMap(PairRoomStatus::name, Function.identity()));
    private final String name;

    public static PairRoomStatus findByName(String value) {
        if (STATUS.containsKey(value)) {
            return STATUS.get(value);
        }
        throw new InvalidPairRoomStatusException("페어룸 상태가 존재하지 않습니다.");
    }
}
