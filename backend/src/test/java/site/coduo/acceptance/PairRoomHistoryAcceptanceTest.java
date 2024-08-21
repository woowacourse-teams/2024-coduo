package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.service.dto.PairRoomHistoryUpdateRequest;

class PairRoomHistoryAcceptanceTest extends AcceptanceFixture {

    static String createPairRoom(final PairRoomCreateRequest pairRoom) {
        final PairRoomCreateResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(pairRoom)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);

        return response.accessCode();
    }

    static void savePairRoomHistory(final String accessCode, final PairRoomHistoryCreateRequest request) {
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/history", accessCode)

                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("페어룸 히스토리를 저장한다.")
    void create_pair_room_history() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "해시",
                "파란",
                PairRoomStatus.IN_PROGRESS.name())
        );
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "해시",
                "파란",
                900000,
                600000
        );

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/history", accessCode)

                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("페어룸의 가장 최근 히스토리를 조회한다.")
    void get_latest_pair_room_history() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "켈리",
                "파란",
                PairRoomStatus.IN_PROGRESS.name())
        );
        savePairRoomHistory(
                accessCode,
                new PairRoomHistoryCreateRequest(
                        "켈리",
                        "파란",
                        90000,
                        60000
                )
        );

        // when & then
        RestAssured
                .given()

                .when()
                .get("/api/{accessCode}/history/latest", accessCode)

                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("페어룸의 타이머 남은 시간을 업데이트 한다.")
    void update_timer_remaining_time() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "잉크",
                "파슬리",
                PairRoomStatus.IN_PROGRESS.name())
        );
        savePairRoomHistory(
                accessCode,
                new PairRoomHistoryCreateRequest(
                        "잉크",
                        "파슬리",
                        90000,
                        60000
                )
        );
        savePairRoomHistory(
                accessCode,
                new PairRoomHistoryCreateRequest(
                        "파슬리",
                        "잉크",
                        90000,
                        30000
                )
        );
        final long newTimerRemainingTime = 1000;

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new PairRoomHistoryUpdateRequest(newTimerRemainingTime))

                .when()
                .patch("/api/{accessCode}/history/latest/timer-remaining-time", accessCode)

                .then()
                .statusCode(204);
    }
}
