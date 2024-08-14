package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.TimerDurationCreateRequest;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

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

    @DisplayName("타이머 시간 저장 후, 변경된 타이머 시간을 저장하고, 페어룸 정보를 조회한다.")
    @TestFactory
    Stream<DynamicTest> pairRoom_create_timerDuration_save_pairRoom_get() {
        final PairRoomCreateRequest pairRoomCreateRequest = new PairRoomCreateRequest("잉크", "프람");
        final String accessCode = pairRoomService.savePairNameAndAccessCode(pairRoomCreateRequest);

        return Stream.of(
                dynamicTest("타이머 시간을 저장한다", () -> {
                    // given
                    final long expected = 600000;

                    // when
                    pairRoomService.saveTimerDuration(accessCode, new TimerDurationCreateRequest(expected));

                    // then
                    assertThat(pairRoomService.findByAccessCode(accessCode).getTimerDuration())
                            .isEqualTo(expected);
                }),
                dynamicTest("새로운 타이머 시간을 저장한다", () -> {
                    // given
                    final long expected = 420000;

                    // when
                    pairRoomService.saveTimerDuration(accessCode, new TimerDurationCreateRequest(expected));

                    // then
                    assertThat(pairRoomService.findByAccessCode(accessCode).getTimerDuration())
                            .isEqualTo(expected);
                }),
                dynamicTest("페어룸을 반환한 후, 새로운 타이머 시간으로 변경되어 있는 것을 확인한다", () -> {
                    // given
                    final long expected = 420000;

                    // when
                    pairRoomService.findByAccessCode(accessCode);

                    // then
                    assertThat(pairRoomService.findByAccessCode(accessCode).getTimerDuration())
                            .isEqualTo(expected);
                })
        );
    }
}
