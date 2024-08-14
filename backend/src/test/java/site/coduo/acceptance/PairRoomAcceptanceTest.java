package site.coduo.acceptance;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import io.restassured.RestAssured;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;

@Transactional
class PairRoomAcceptanceTest extends AcceptanceFixture {

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

    static void createTimerDuration(final String accessCode, final long timerDuration) {
        final Map<String, Object> request = Map.of("timerDuration", timerDuration);

        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")
                .body(request)

                .when()
                .post("/api/pair-room/{accessCode}/info", accessCode)

                .then()
                .log()
                .all()
                .statusCode(201);
    }

    @Test
    @DisplayName("페어룸 요청 시 정보를 반환한다.")
    void show_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl = createPairRoom(new PairRoomCreateRequest("레디", "프람"));
        createTimerDuration(pairRoomUrl.accessCode(), 600000);

        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .get("/api/pair-room/" + pairRoomUrl.accessCode())

                .then()
                .log()
                .all()
                .statusCode(200);
    }

    @Test
    @DisplayName("타이머 시간을 저장한다.")
    void save_timer_duration() {
        // given
        final PairRoomCreateResponse pairRoomUrl = createPairRoom(new PairRoomCreateRequest("레디", "프람"));
        final Map<String, Object> request = Map.of("timerDuration", 600000);

        // when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")
                .body(request)

                .when()
                .post("/api/pair-room/{accessCode}/info", pairRoomUrl.accessCode())

                .then()
                .log()
                .all()
                .statusCode(201);
    }

    @Test
    @DisplayName("페어룸을 삭제한다.")
    void delete_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl = createPairRoom(new PairRoomCreateRequest("레디", "프람"));

        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .delete("/api/pair-room/" + pairRoomUrl.accessCode())

                .then()
                .log()
                .all()
                .statusCode(204);
    }

    @Test
    @DisplayName("존재하지 않은 accessCode로 페어룸 삭제시 실패한다.")
    void fail_delete_pair_room() {
        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .delete("/api/pair-room/" + "zzzzzz")

                .then()
                .log()
                .all()
                .statusCode(404);
    }
}
