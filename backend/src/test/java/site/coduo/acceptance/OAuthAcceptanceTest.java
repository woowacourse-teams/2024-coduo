package site.coduo.acceptance;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;

class OAuthAcceptanceTest extends AcceptanceFixture {

    @Test
    @DisplayName("깃허브로 인가 요청을 보낸다.")
    void request_to_github_authorization_end_point() {
        RestAssured
                .given()
                .redirects()
                .follow(false)

                .when()
                .get("/api/oauth/github/authorize")

                .then().log().all()
                .statusCode(HttpStatus.FOUND.value())
                .header(HttpHeaders.LOCATION,
                        "https://www.github.com/login/oauth/authorize?client_id=test&state=random%20number&redirect_uri=http://test.test");
    }
}
