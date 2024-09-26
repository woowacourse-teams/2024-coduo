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
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.sync.service.TimestampRegistry;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.service.dto.TimerReadResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;
import site.coduo.utils.CascadeCleaner;

@Transactional
@SpringBootTest
class TimerServiceTest extends CascadeCleaner {

    @Autowired
    private PairRoomService pairRoomService;

    @Autowired
    private TimestampRegistry timestampRegistry;

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
        final PairRoomCreateRequest request = new PairRoomCreateRequest("켈리", "레모네", 10000L, 1000L,
                PairRoomStatus.IN_PROGRESS.name());

        // when & then
        assertThatCode(() -> pairRoomService.savePairRoom(request, null))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("타이머를 반환한다.")
    void get_latest_timer() {
        // given
        final PairRoomCreateRequest request = new PairRoomCreateRequest("잉크", "레디", 1000L, 1000L,
                PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // when
        final TimerReadResponse actual = timerService.readTimer(accessCode);

        // then
        assertAll(
                () -> assertThat(actual.duration()).isEqualTo(request.timerDuration()),
                () -> assertThat(actual.remainingTime()).isEqualTo(request.timerRemainingTime())
        );
    }

    @Test
    @DisplayName("타이머를 업데이트 한다.")
    void update_timer() {
        // given
        final PairRoomCreateRequest request = new PairRoomCreateRequest("잉크", "레디", 10000000L, 100L,
                PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.savePairRoom(request, null);

        final TimerUpdateRequest timerRequest = new TimerUpdateRequest(10000, 5000);

        // when
        timerService.updateTimer(accessCode, timerRequest);

        // then
        final TimerReadResponse actual = timerService.readTimer(accessCode);
        assertThat(actual)
                .extracting("duration", "remainingTime")
                .contains(timerRequest.duration(), timerRequest.remainingTime());
    }

    @Test
    @DisplayName("타이머 남은 시간을 반환한다. - 타이머 타임 스탬프가 존재할 경우")
    void get_remaining_time_when_exist_timestamp() {
        // given
        final PairRoomCreateRequest pairRoomCreateRequest = new PairRoomCreateRequest("켈리", "레모네", 3000L, 3000L,
                PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.save(pairRoomCreateRequest);
        final Timer timeStamp = new Timer(new AccessCode(accessCode), 10000L, 10000L);
        timestampRegistry.register(accessCode, timeStamp);

        // when
        final long remainingTime = timerService.readTimerRemainingTime(accessCode);

        // then
        assertThat(remainingTime).isEqualTo(timeStamp.getRemainingTime());
    }

    @Test
    @DisplayName("타이머 남은 시간을 반환한다. - 타이머가 한번도 동작하지 않았을 경우")
    void get_remaining_time_when_not_exist_timestamp() {
        // given
        final PairRoomCreateRequest pairRoomCreateRequest = new PairRoomCreateRequest("켈리", "레모네", 3000L, 3000L,
                PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.save(pairRoomCreateRequest);

        // when
        final long remainingTime = timerService.readTimerRemainingTime(accessCode);

        // then
        assertThat(remainingTime).isEqualTo(pairRoomCreateRequest.timerRemainingTime());
    }
}
