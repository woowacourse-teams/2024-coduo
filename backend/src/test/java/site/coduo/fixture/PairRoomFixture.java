package site.coduo.fixture;

import static site.coduo.fixture.AccessCodeFixture.ACCESS_CODE;
import static site.coduo.fixture.AccessCodeFixture.ALPHABET_ACCESS_CODE;
import static site.coduo.fixture.AccessCodeFixture.NUMBER_ACCESS_CODE;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;

public class PairRoomFixture {

    public static final PairRoom INK_REDDDY_ROOM = new PairRoom(
            new Pair(
                    new PairName("잉크"),
                    new PairName("레디")
            ),
            PairRoomStatus.IN_PROGRESS,
            ACCESS_CODE);

    public static final PairRoom FRAM_LEMONE_ROOM = new PairRoom(
            new Pair(
                    new PairName("프람"),
                    new PairName("레모네")
            ),
            PairRoomStatus.IN_PROGRESS,
            ALPHABET_ACCESS_CODE);

    public static final PairRoom KELY_LEMONE_ROOM = new PairRoom(
            new Pair(
                    new PairName("켈리"),
                    new PairName("레모네")
            ),
            PairRoomStatus.IN_PROGRESS,
            NUMBER_ACCESS_CODE
    );
}
