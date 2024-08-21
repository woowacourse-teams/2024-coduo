package site.coduo.pairroom.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@SpringBootTest
@Transactional
class PairRoomRepositoryTest {

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Test
    @DisplayName("엑세스 코드를 바탕으로 영속성을 조회한다.- 영속성 존재 O")
    void search_persistence_by_access_code_exists_case() {
        // given
        final Pair pair = new Pair(new PairName("hello"), new PairName("world"));
        final PairRoom pairRoom = new PairRoom(pair, PairRoomStatus.IN_PROGRESS, new AccessCode("code"));
        pairRoomRepository.save(pairRoom);

        // when
        final Optional<PairRoom> persistence = pairRoomRepository.findByAccessCode(pairRoom.getAccessCode());

        // then
        assertThat(persistence).hasValue(pairRoom);
    }

    @Test
    @DisplayName("엑세스 코드를 바탕으로 영속성을 조회한다.- 영속성 존재 X")
    void search_persistence_by_access_code_not_exists_case() {
        // given
        final Pair pair = new Pair(new PairName("hello"), new PairName("world"));
        final PairRoom pairRoom = new PairRoom(pair, PairRoomStatus.IN_PROGRESS, new AccessCode("code"));

        // when
        final Optional<PairRoom> persistence = pairRoomRepository.findByAccessCode(pairRoom.getAccessCode());

        // then
        assertThat(persistence).isEmpty();
    }
}
