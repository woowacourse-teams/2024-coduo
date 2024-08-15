package site.coduo.pairroomhistory.service;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
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
}
