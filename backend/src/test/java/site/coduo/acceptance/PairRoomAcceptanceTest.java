package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;

class PairRoomAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("페어룸 요청 시 정보를 반환한다.")
    void show_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl = createPairRoom(new PairRoomCreateRequest("레디", "프람"));

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
                .delete("/pair-room/" + "zzzzzz")

                .then()
                .log()
                .all()
                .statusCode(404);
    }

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
}
