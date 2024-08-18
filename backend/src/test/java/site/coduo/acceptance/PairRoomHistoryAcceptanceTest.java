package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;
import site.coduo.pairroomhistory.dto.PairRoomHistoryUpdateRequest;

class PairRoomHistoryAcceptanceTest extends AcceptanceFixture {

    static PairRoomCreateResponse createPairRoom(final PairRoomCreateRequest pairRoom) {
        return RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(pairRoom)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);
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
        final PairRoomCreateResponse pairRoomCreateResponse = createPairRoom(new PairRoomCreateRequest("해시", "파란"));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "해시",
                "파란",
                123,
                600000
        );

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/history", pairRoomCreateResponse.accessCode())

                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("페어룸의 가장 최근 히스토리를 반환한다.")
    void get_latest_pair_room_history() {
        // given
        final PairRoomCreateResponse pairRoomCreateResponse = createPairRoom(new PairRoomCreateRequest("켈리", "파란"));
        savePairRoomHistory(
                pairRoomCreateResponse.accessCode(),
                new PairRoomHistoryCreateRequest("켈리", "파란", 0, 600000)
        );

        // when & then
        RestAssured
                .given()

                .when()
                .get("/api/{accessCode}/history/latest", pairRoomCreateResponse.accessCode())

                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("페어룸의 타이머 남은 시간을 업데이트 한다.")
    void update_timer_remaining_time() {
        // given
        final PairRoomCreateResponse pairRoomCreateResponse = createPairRoom(new PairRoomCreateRequest("잉크", "파슬리"));
        savePairRoomHistory(
                pairRoomCreateResponse.accessCode(),
                new PairRoomHistoryCreateRequest("잉크", "파슬리", 0, 600000)
        );
        savePairRoomHistory(
                pairRoomCreateResponse.accessCode(),
                new PairRoomHistoryCreateRequest("파슬리", "잉크", 1, 300000)
        );

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new PairRoomHistoryUpdateRequest(100000))

                .when()
                .patch("/api/{accessCode}/history/latest/timer-remaining-time", pairRoomCreateResponse.accessCode())

                .then()
                .statusCode(200);
    }
}
