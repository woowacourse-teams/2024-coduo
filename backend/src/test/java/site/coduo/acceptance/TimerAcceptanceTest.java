package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;

class TimerAcceptanceTest extends AcceptanceFixture {

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

    private static void timerStart(final String accessCode) {
        SseAcceptanceTest.createConnect(accessCode);
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/start", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 조회한다.")
    void get_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "켈리",
                "파란",
                10000L,
                10000L,
                PairRoomStatus.IN_PROGRESS.name())
        );

        // when & then
        RestAssured
                .given()

                .when()
                .get("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("페어룸의 타이머를 업데이트 한다.")
    void update_timer_duration() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "해시",
                "파슬리",
                10000L,
                10000L,
                PairRoomStatus.IN_PROGRESS.name())
        );
        final TimerUpdateRequest request = new TimerUpdateRequest(20000L, 3000L);

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .patch("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 시작한다.")
    void start_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest("fram", "lemone", 10000L, 10000L,
                PairRoomStatus.IN_PROGRESS.name()));
        SseAcceptanceTest.createConnect(accessCode);

        // when & then
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/start", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 종료한다.")
    void stop_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest("fram", "lemone", 10000L, 10000L,
                PairRoomStatus.IN_PROGRESS.name()));
        timerStart(accessCode);

        // when & then
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/stop", accessCode)

                .then()
                .statusCode(204);
    }
}
