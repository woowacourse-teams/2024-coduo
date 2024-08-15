package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;

import io.restassured.RestAssured;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;
import site.coduo.pairroomhistory.dto.PairRoomHistoryCreateRequest;

@Transactional
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

    @Test
    @DisplayName("페어룸 히스토리를 저장한다.")
    void create_pair_room_history() {
        // given
        final PairRoomCreateResponse pairRoomCreateResponse = createPairRoom(new PairRoomCreateRequest("해시", "파란"));
        final PairRoomHistoryCreateRequest request = new PairRoomHistoryCreateRequest(
                "해시",
                "파란",
                0,
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
}
