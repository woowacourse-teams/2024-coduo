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
class PairRoomEntityRepositoryTest {

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Test
    @DisplayName("엑세스 코드를 바탕으로 영속성을 조회한다.- 영속성 존재 O")
    void search_persistence_by_access_code_exists_case() {
        // given
        final Pair pair = new Pair(new PairName("hello"), new PairName("world"));
        final PairRoom pairRoom = new PairRoom(PairRoomStatus.IN_PROGRESS, pair, new AccessCode("code"));
        final PairRoomEntity entity = PairRoomEntity.from(
                pairRoom);
        pairRoomRepository.save(entity);

        // when
        final Optional<PairRoomEntity> persistence = pairRoomRepository.findByAccessCode(
                pairRoom.getAccessCodeText());

        // then
        assertThat(persistence).hasValue(entity);
    }

    @Test
    @DisplayName("엑세스 코드를 바탕으로 영속성을 조회한다.- 영속성 존재 X")
    void search_persistence_by_access_code_not_exists_case() {
        // given
        final Pair pair = new Pair(new PairName("hello"), new PairName("world"));
        final PairRoom pairRoom = new PairRoom(PairRoomStatus.IN_PROGRESS, pair, new AccessCode("code"));

        // when
        final Optional<PairRoomEntity> persistence = pairRoomRepository.findByAccessCode(
                pairRoom.getAccessCodeText());

        // then
        assertThat(persistence).isEmpty();
    }

    @Test
    @DisplayName("엑세스 코드 도메인을 바탕으로 영속성을 조회한다.- 영속성 존재 O")
    void search_persistence_by_access_code_domain_exists_case() {
        // given
        final Pair pair = new Pair(new PairName("hello"), new PairName("world"));
        final AccessCode code = new AccessCode("code");
        final PairRoom pairRoom = new PairRoom(PairRoomStatus.IN_PROGRESS, pair, code);
        pairRoomRepository.save(PairRoomEntity.from(pairRoom));

        // when
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(code);

        // then
        assertThat(pairRoomEntity)
                .extracting("accessCode")
                .isEqualTo(code.getValue());
    }
}
