package site.coduo.pairroom.service.dto;

import site.coduo.pairroom.repository.PairRoomEntity;

public record PairRoomMemberResponse(
        Long id,
        String status,
        String navigator,
        String driver,
        String accessCode
) {

    public static PairRoomMemberResponse from(final PairRoomEntity pairRoom) {
        return new PairRoomMemberResponse(pairRoom.getId(), pairRoom.getStatus().name(), pairRoom.getNavigator(),
                pairRoom.getDriver(), pairRoom.getAccessCode());
    }
}
