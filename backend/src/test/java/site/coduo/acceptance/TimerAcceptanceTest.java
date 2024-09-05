package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.timer.service.dto.TimerCreateRequest;
import site.coduo.timer.service.dto.TimerDurationUpdateRequest;
import site.coduo.timer.service.dto.TimerRemainingTimeUpdateRequest;

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

    static void saveTimer(final String accessCode, final TimerCreateRequest request) {
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("타이머를 저장한다.")
    void create_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "프람",
                "레모네",
                PairRoomStatus.IN_PROGRESS.name())
        );
        final TimerCreateRequest request = new TimerCreateRequest(
                900000,
                600000
        );

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("타이머를 조회한다.")
    void get_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "켈리",
                "파란",
                PairRoomStatus.IN_PROGRESS.name())
        );
        saveTimer(
                accessCode,
                new TimerCreateRequest(
                        90000,
                        60000
                )
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
    @DisplayName("페어룸의 타이머 남은 시간을 업데이트 한다.")
    void update_remaining_time() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "잉크",
                "파슬리",
                PairRoomStatus.IN_PROGRESS.name())
        );
        saveTimer(
                accessCode,
                new TimerCreateRequest(
                        90000,
                        60000
                )
        );
        final long newTimerRemainingTime = 1000;

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new TimerRemainingTimeUpdateRequest(newTimerRemainingTime))

                .when()
                .patch("/api/{accessCode}/timer/remaining-time", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("페어룸의 타이머 시간을 업데이트 한다.")
    void update_timer_duration() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "해시",
                "파슬리",
                PairRoomStatus.IN_PROGRESS.name())
        );
        saveTimer(
                accessCode,
                new TimerCreateRequest(
                        90000,
                        60000
                )
        );
        final long newTimerDuration = 1234;

        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new TimerDurationUpdateRequest(newTimerDuration))

                .when()
                .patch("/api/{accessCode}/timer/duration", accessCode)

                .then()
                .statusCode(204);
    }

}
