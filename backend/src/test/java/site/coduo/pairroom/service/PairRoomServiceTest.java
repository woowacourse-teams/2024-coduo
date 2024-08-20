package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;

@Transactional
@SpringBootTest
class PairRoomServiceTest {

    @Autowired
    private PairRoomService pairRoomService;

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
                new PairRoomCreateRequest("레디", "프람", PairRoomStatus.ONBOARDING.name());
        final String accessCode = pairRoomService.save(request);

        // when
        pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.IN_PROGRESS.name());

        // then
        assertThat(pairRoomService.findByAccessCode(accessCode).getStatus()).isEqualTo(PairRoomStatus.IN_PROGRESS);
    }
}
