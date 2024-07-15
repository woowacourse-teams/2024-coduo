package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

class ReferenceAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("레퍼런스 링크 생성 요청")
    void reference_link_create_request() {
        // given
        final Map<String, Object> request = Map.of("url", "value");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .log().all()
                .post("/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, "/");
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회하는 요청")
    void read_all_reference_link_request() {
        // given
        createReferenceLink("url1");
        createReferenceLink("url2");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .get("/reference-link")

                .then()
                .assertThat()
                .statusCode(HttpStatus.OK.value())
                .body("size()", is(2));
    }

    void createReferenceLink(final String url) {
        final Map<String, Object> request = Map.of("url", url);

        RestAssured
                .given()
                .contentType(ContentType.JSON)
                .body(request)

                .when()
                .post("/reference-link");
    }

    @Test
    @DisplayName("레퍼런스 링크를 삭제하는 요청")
    void delete_reference_link() {
        // given
        createReferenceLink("url");

        // when & then
        RestAssured
                .given()
                .contentType(ContentType.JSON)

                .when()
                .log().all()
                .delete("/reference-link/1")

                .then()
                .assertThat()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
