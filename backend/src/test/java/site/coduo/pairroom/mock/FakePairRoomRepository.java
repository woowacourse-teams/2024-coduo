package site.coduo.pairroom.mock;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.service.port.PairRoomRepository;

public class FakePairRoomRepository implements PairRoomRepository {

    private Long autoGeneratedId = 0L;
    public final List<PairRoom> data = new ArrayList<>();

    @Override
    public PairRoom save(final PairRoom pairRoom) {
        if (pairRoom.getId() == null || pairRoom.getId() == 0) {
            final PairRoom createdPairRoom = new PairRoom(++autoGeneratedId, pairRoom.getPair(), pairRoom.getAccessCode());
            data.add(createdPairRoom);
            return createdPairRoom;
        } else {
            data.removeIf(item -> Objects.equals(item.getId(), pairRoom.getId()));
            data.add(pairRoom);
            return pairRoom;
        }
    }

    @Override
    public Optional<PairRoom> findById(final Long id) {
        return data.stream()
                .filter(pairRoom -> pairRoom.getId().equals(id)).findFirst();
    }
}
