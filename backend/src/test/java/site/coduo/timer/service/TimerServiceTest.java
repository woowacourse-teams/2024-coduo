package site.coduo.timer.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.timer.service.dto.TimerCreateRequest;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.utils.CascadeCleaner;

@Transactional
@SpringBootTest
class TimerServiceTest extends CascadeCleaner {

    @Autowired
    private PairRoomService pairRoomService;

    @Autowired
    private TimerService timerService;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("타이머를 저장한다.")
    void create_timer() {
        // given
    final String accessCode = pairRoomService
            .save(new PairRoomCreateRequest("켈리", "레모네", PairRoomStatus.IN_PROGRESS.name()));
        final TimerCreateRequest request = new TimerCreateRequest(
                900000,
                600000
        );

        // when & then
        assertThatCode(() -> timerService.createTimer(accessCode, request))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("타이머를 반환한다.")
    void get_latest_timer() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final TimerCreateRequest request = new TimerCreateRequest(
                900000,
                600000
        );
        timerService.createTimer(accessCode, request);

        // when
        final TimerReadResponse actual = timerService.readTimer(accessCode);

        // then
        assertAll(
                () -> assertThat(actual.duration()).isEqualTo(request.duration()),
                () -> assertThat(actual.remainingTime()).isEqualTo(request.remainingTime())
        );
    }

    @Test
    @DisplayName("타이머의 남은 시간을 업데이트 한다.")
    void update_timer_remaining_time() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final TimerCreateRequest request = new TimerCreateRequest(
                900000,
                600000
        );
        timerService.createTimer(accessCode, request);
        final long newTimerRemainingTime = 300000;

        // when
        timerService.updateTimerRemainingTime(accessCode, newTimerRemainingTime);
        final TimerReadResponse actual = timerService.readTimer(accessCode);

        // then
        assertThat(actual.remainingTime()).isEqualTo(newTimerRemainingTime);
    }

    @Test
    @DisplayName("타이머 시간을 업데이트 한다.")
    void update_timer_duration() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final TimerCreateRequest request = new TimerCreateRequest(
                900000,
                600000
        );
        timerService.createTimer(accessCode, request);
        final long newTimerDuration = 9500000;

        // when
        timerService.updateTimerDuration(accessCode, newTimerDuration);
        final TimerReadResponse actual = timerService.readTimer(accessCode);

        // then
        assertThat(actual.duration()).isEqualTo(newTimerDuration);
    }
}
