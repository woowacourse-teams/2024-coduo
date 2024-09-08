package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.timer.repository.TimerRepository;

@Transactional
@SpringBootTest
class PairRoomServiceTest {

    @Autowired
    private PairRoomService pairRoomService;
    @Autowired
    private TimerRepository timerRepository;

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L,
                        PairRoomStatus.IN_PROGRESS.name());

        // when
        final String accessCode = pairRoomService.save(request);

        // then
        assertThatCode(() -> pairRoomService.findByAccessCode(accessCode))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("페어룸을 생성할때 타이머도 함께 생성된다..")
    void create_timer_when_create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L,
                        PairRoomStatus.IN_PROGRESS.name());

        // when
        final String accessCode = pairRoomService.save(request);

        // then
        assertThat(timerRepository.findAll()).hasSize(1);
    }


    @Test
    @Transactional
    @DisplayName("존재하지 않는 페어룸 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_not_exist_access_code() {
        // given
        final String notSavedAccessCode = "123456";

        // when & then
        assertThatThrownBy(() -> pairRoomService.findByAccessCode(notSavedAccessCode))
                .isExactlyInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("페어룸 상태를 변경한다.")
    void update_pair_room_status() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.save(request);

        // when
        pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name());

        // then
        assertThat(PairRoomStatus.findByName(pairRoomService.findByAccessCode(accessCode).status()))
                .isEqualTo(PairRoomStatus.COMPLETED);
    }
}
