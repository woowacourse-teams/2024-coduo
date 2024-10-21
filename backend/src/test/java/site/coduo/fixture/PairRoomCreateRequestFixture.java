package site.coduo.fixture;

import site.coduo.pairroom.service.dto.PairRoomCreateRequest;

public class PairRoomCreateRequestFixture {

    public static final PairRoomCreateRequest PAIR_ROOM_CREATE_REQUEST = new PairRoomCreateRequest("레디", "프람", null,
            60000L,
            60000L, "https://missionUrl.xxx");
}
