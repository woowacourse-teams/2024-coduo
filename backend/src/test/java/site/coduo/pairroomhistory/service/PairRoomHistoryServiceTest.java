package site.coduo.pairroomhistory.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;

import java.util.stream.Stream;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.repository.PairRoomHistoryEntity;
import site.coduo.pairroomhistory.repository.PairRoomHistoryRepository;
import site.coduo.utils.CascadeCleaner;

@Transactional
@SpringBootTest
class PairRoomHistoryServiceTest extends CascadeCleaner {

    @Autowired
    private PairRoomService pairRoomService;

    @Autowired
    private PairRoomHistoryService pairRoomHistoryService;

    @Autowired
    private PairRoomHistoryRepository pairRoomHistoryRepository;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("페어룸 히스토리를 저장한다.")
    void create_pair_room_history() {
        // given
        final String accessCode = pairRoomService.savePairNameAndAccessCode(new PairRoomCreateRequest("켈리", "레모네"));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "켈리",
                "레모네",
                0,
                600000
        );

        // when & then
        assertThatCode(() -> pairRoomHistoryService.createPairRoomHistory(accessCode, request))
                .doesNotThrowAnyException();
    }

    @DisplayName("페어룸 히스토리 중 가장 최근 히스토리를 반환한다.")
    @Transactional
    @TestFactory
    Stream<DynamicTest> get_latest_pair_room_history() {
        final String firstAccessCode = pairRoomService
                .savePairNameAndAccessCode(new PairRoomCreateRequest("잉크", "레디"));
        final String secondAccessCode = pairRoomService
                .savePairNameAndAccessCode(new PairRoomCreateRequest("파슬리", "파란"));

        return Stream.of(
                dynamicTest("첫번째 페어룸의 히스토리를 두개 저장한 뒤, 가장 최근 히스토리가 반환되는지 확인한다.", () -> {
                    // given
                    final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                            "잉크",
                            "레디",
                            0,
                            600000
                    );
                    final PairRoomHistoryCreateRequest secondRequest = new PairRoomHistoryCreateRequest(
                            "레디",
                            "잉크",
                            1,
                            300000
                    );
                    final long pairRoomId = pairRoomService.findByAccessCode(firstAccessCode).getId();

                    // when
                    pairRoomHistoryService.createPairRoomHistory(firstAccessCode, request);
                    pairRoomHistoryService.createPairRoomHistory(firstAccessCode, secondRequest);

                    // then
                    assertAll(
                            () -> assertThat(pairRoomHistoryRepository.findAll()).hasSize(2),
                            () -> {
                                final PairRoomHistoryEntity actual = pairRoomHistoryRepository
                                        .findTopByPairRoomIdOrderByCreatedAtDesc(pairRoomId).get();
                                assertThat(actual.getDriver()).isEqualTo(secondRequest.driver());
                                assertThat(actual.getNavigator()).isEqualTo(secondRequest.navigator());
                                assertThat(actual.getTimerRound()).isEqualTo(secondRequest.timerRound());
                                assertThat(actual.getTimerRemainingTime()).isEqualTo(secondRequest.timerRemainingTime());
                            }
                    );

                }),
                dynamicTest("두번째 페어룸의 히스토리를 세개 저장한 뒤, 가장 최근 히스토리가 반환되는지 확인한다.", () -> {
                    // given
                    final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                            "파슬리",
                            "파란",
                            0,
                            600000
                    );
                    final PairRoomHistoryCreateRequest secondRequest = new PairRoomHistoryCreateRequest(
                            "파슬리",
                            "파란",
                            0,
                            700000
                    );
                    final PairRoomHistoryCreateRequest thirdRequest = new PairRoomHistoryCreateRequest(
                            "파란",
                            "파슬리",
                            1,
                            700000
                    );
                    final long pairRoomId = pairRoomService.findByAccessCode(secondAccessCode).getId();

                    // when
                    pairRoomHistoryService.createPairRoomHistory(secondAccessCode, request);
                    pairRoomHistoryService.createPairRoomHistory(secondAccessCode, secondRequest);
                    pairRoomHistoryService.createPairRoomHistory(secondAccessCode, thirdRequest);

                    // then
                    assertAll(
                            () -> assertThat(pairRoomHistoryRepository.findAll()).hasSize(5),
                            () -> {
                                final PairRoomHistoryEntity actual = pairRoomHistoryRepository
                                        .findTopByPairRoomIdOrderByCreatedAtDesc(pairRoomId).get();

                                assertThat(actual.getDriver()).isEqualTo(thirdRequest.driver());
                                assertThat(actual.getNavigator()).isEqualTo(thirdRequest.navigator());
                                assertThat(actual.getTimerRound()).isEqualTo(thirdRequest.timerRound());
                                assertThat(actual.getTimerRemainingTime()).isEqualTo(thirdRequest.timerRemainingTime());
                            }
                    );
                })
        );
    }
}
