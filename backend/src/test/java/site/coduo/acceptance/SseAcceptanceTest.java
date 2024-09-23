package site.coduo.acceptance;

import static site.coduo.acceptance.PairRoomAcceptanceTest.createPairRoom;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;

class SseAcceptanceTest extends AcceptanceFixture {

    static void createConnect(final String accessCode) {
        RestAssured
                .given()

                .when()
                .log().all()
                .get("/api/{key}/connect", accessCode)

                .then()
                .log().all()
                .statusCode(200);

    }

    @Test
    @DisplayName("페어룸에 접속하여 SSE connection을 생성한다.")
    void create_sse_connection() {
        // given
        final PairRoomCreateRequest request = new PairRoomCreateRequest("프람", "레모네", 10000L,
                10000L, PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = createPairRoom(request).accessCode();

        // when & then
        RestAssured
                .given()

                .when()
                .log().all()
                .get("/api/{key}/connect", accessCode)

                .then()
                .log().all()
                .statusCode(200);
    }
}
