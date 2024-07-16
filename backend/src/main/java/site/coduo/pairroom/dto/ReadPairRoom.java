package site.coduo.pairroom.dto;

import site.coduo.pairroom.domain.PairRoom;

public record ReadPairRoom(Long id, String nameA, String nameB) {

    public static ReadPairRoom from(final PairRoom pairRoom) {
        return new ReadPairRoom(pairRoom.getId(), pairRoom.getPairAName(), pairRoom.getPairBName());
    }
}
