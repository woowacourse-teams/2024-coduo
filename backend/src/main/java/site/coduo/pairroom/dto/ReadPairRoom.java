package site.coduo.pairroom.dto;

import site.coduo.pairroom.domain.PairRoom;

public record ReadPairRoom(Long id, String pairAName, String pairBName) {

    public static ReadPairRoom from(PairRoom pairRoom) {
        return new ReadPairRoom(pairRoom.getId(), pairRoom.getPairAName(), pairRoom.getPairBName());
    }
}
