package site.coduo.pairroomhistory.service;

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
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryReadResponse;
import site.coduo.utils.CascadeCleaner;

@Transactional
@SpringBootTest
class PairRoomHistoryServiceTest extends CascadeCleaner {

    @Autowired
    private PairRoomService pairRoomService;

    @Autowired
    private PairRoomHistoryService pairRoomHistoryService;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("페어룸 히스토리를 저장한다.")
    void create_pair_room_history() {
        // given
    final String accessCode = pairRoomService
            .save(new PairRoomCreateRequest("켈리", "레모네", PairRoomStatus.IN_PROGRESS.name()));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "켈리",
                "레모네",
                900000,
                600000
        );

        // when & then
        assertThatCode(() -> pairRoomHistoryService.createPairRoomHistory(accessCode, request))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("페어룸 히스토리 중 가장 최근 히스토리를 반환한다.")
    void get_latest_pair_room_history() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "잉크",
                "레디",
                900000,
                600000
        );
        final PairRoomHistoryCreateRequest secondRequest = new PairRoomHistoryCreateRequest(
                "레디",
                "잉크",
                900000,
                300000
        );
        pairRoomHistoryService.createPairRoomHistory(accessCode, request);
        pairRoomHistoryService.createPairRoomHistory(accessCode, secondRequest);
        final int timerRound = 2;

        // when
        final PairRoomHistoryReadResponse actual = pairRoomHistoryService.readLatestPairRoomHistory(accessCode);

        // then
        assertAll(
                () -> assertThat(actual.driver()).isEqualTo(secondRequest.driver()),
                () -> assertThat(actual.navigator()).isEqualTo(secondRequest.navigator()),
                () -> assertThat(actual.timerRound()).isEqualTo(timerRound),
                () -> assertThat(actual.timerDuration()).isEqualTo(secondRequest.timerDuration()),
                () -> assertThat(actual.timerRemainingTime()).isEqualTo(secondRequest.timerRemainingTime())
        );
    }

    @Test
    @DisplayName("페어룸 히스토리의 타이머 남은 시간을 업데이트 한다.")
    void update_timer_remaining_time() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "잉크",
                "레디",
                900000,
                600000
        );
        pairRoomHistoryService.createPairRoomHistory(accessCode, request);
        final long newTimerRemainingTime = 300000;

        // when
        pairRoomHistoryService.updateTimerRemainingTime(accessCode, newTimerRemainingTime);
        final PairRoomHistoryReadResponse actual = pairRoomHistoryService.readLatestPairRoomHistory(accessCode);

        // then
        assertThat(actual.timerRemainingTime()).isEqualTo(newTimerRemainingTime);
    }

    @Test
    @DisplayName("페어룸 히스토리의 타이머 시간을 업데이트 한다.")
    void update_timer_duration() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.IN_PROGRESS.name()));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "잉크",
                "레디",
                900000,
                600000
        );
        pairRoomHistoryService.createPairRoomHistory(accessCode, request);
        final long newTimerDuration = 9500000;

        // when
        pairRoomHistoryService.updateTimerDuration(accessCode, newTimerDuration);
        final PairRoomHistoryReadResponse actual = pairRoomHistoryService.readLatestPairRoomHistory(accessCode);

        // then
        assertThat(actual.timerDuration()).isEqualTo(newTimerDuration);
    }
}
