package site.coduo.acceptance;

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
                .statusCode(HttpStatus.CREATED.value())
                .header(HttpHeaders.LOCATION, "/");
    }
}
