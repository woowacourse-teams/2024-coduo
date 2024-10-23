package site.coduo.pairroom.domain;

import lombok.Getter;
import site.coduo.pairroom.exception.InvalidRoomNameFormatException;

@Getter
public class RoomName {

    private static final String DEFAULT_ROOM_NAME_SUFFIX = "의 페어룸";
    private static final int MAX_LENGTH = 35;

    private final String value;

    public RoomName(final String value) {
        validateEmpty(value);
        final String trimmedValue = value.trim();
        validateLength(trimmedValue);
        this.value = trimmedValue;
    }

    public static RoomName makeDefaultRoomNameFrom(final String easyAccessCode) {
        final String defaultRoomName = easyAccessCode + DEFAULT_ROOM_NAME_SUFFIX;
        return new RoomName(defaultRoomName);
    }

    private void validateEmpty(final String value) {
        if (value == null || value.isBlank()) {
            throw new InvalidRoomNameFormatException("페어룸 이름이 비어있습니다.");
        }
    }

    private void validateLength(final String value) {
        if (value.length() > MAX_LENGTH) {
            throw new InvalidRoomNameFormatException(String.format("페어룸 이름은 %d자 이하여야 합니다.", MAX_LENGTH));
        }
    }
}
