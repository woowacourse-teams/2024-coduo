package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import static site.coduo.acceptance.PairRoomAcceptanceTest.createPairRoom;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.dto.PairRoomCreateResponse;

class ReferenceAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("레퍼런스 링크 생성 요청")
    void reference_link_create_request() {
        // given
        final PairRoomCreateResponse pairRoom = createPairRoom(new PairRoomCreateRequest("레모네", "프람"));
        final Map<String, Object> request = Map.of("url", "http://www.naber.com");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .log().all()
                .post("/api/" + pairRoom.accessCode() + "/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, "/");
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회하는 요청")
    void read_all_reference_link_request() {
        // given
        final PairRoomCreateResponse pairRoom = createPairRoom(new PairRoomCreateRequest("레모네", "프람"));
        createReferenceLink("http://www.some.url", pairRoom.accessCode());
        createReferenceLink("http://www.some.url2", pairRoom.accessCode());

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .get("/api/" + pairRoom.accessCode() + "/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("size()", is(2));
    }

    void createReferenceLink(final String url, String accessCodeText) {
        final Map<String, Object> request = Map.of("url", url);

        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .post("/api/" + accessCodeText + "/reference-link");
    }

    @Test
    @DisplayName("레퍼런스 링크를 삭제하는 요청")
    void delete_reference_link_request() {
        // given
        final PairRoomCreateResponse pairRoom = createPairRoom(new PairRoomCreateRequest("레모네", "프람"));

        createReferenceLink("url", pairRoom.accessCode());

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .log().all()
                .delete("/api/" + pairRoom.accessCode() + "/reference-link/1")

                .then()
                .assertThat()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
