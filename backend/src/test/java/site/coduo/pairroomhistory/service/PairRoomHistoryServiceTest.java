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
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.dto.PairRoomHistoryReadResponse;
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
            .save(new PairRoomCreateRequest("켈리", "레모네", PairRoomStatus.ONBOARDING.name()));
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

    @DisplayName("페어룸 히스토리 중 가장 최근 히스토리를 반환한다.")
    @Test
    void get_latest_pair_room_history() {
        // given
        final String accessCode = pairRoomService
                .save(new PairRoomCreateRequest("잉크", "레디", PairRoomStatus.ONBOARDING.name()));
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

        // when
        final PairRoomHistoryReadResponse actual = pairRoomHistoryService.readLatestPairRoomHistory(accessCode);

        // then
        assertAll(
                () -> assertThat(actual.driver()).isEqualTo(secondRequest.driver()),
                () -> assertThat(actual.navigator()).isEqualTo(secondRequest.navigator()),
                // todo: 타이머 듀레이션, 라운드 검증 추가
                () -> assertThat(actual.timerRemainingTime()).isEqualTo(secondRequest.timerRemainingTime())
        );
    }
}
