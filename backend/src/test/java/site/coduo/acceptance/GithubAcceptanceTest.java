package site.coduo.acceptance;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;

import static site.coduo.common.config.web.filter.AccessTokenCookieFilter.TEMPORARY_ACCESS_TOKEN_COOKIE_NAME;
import static site.coduo.fake.FakeGithubApiClient.LOGIN_ID;
import static site.coduo.fake.FakeGithubApiClient.USER_ID;
import static site.coduo.fake.FakeGithubOAuthClient.ACCESS_TOKEN;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;

import io.restassured.RestAssured;
import site.coduo.fake.FixedNonceProvider;
import site.coduo.member.domain.repository.MemberEntity;
import site.coduo.fixture.MemberDummy;

class GithubAcceptanceTest extends AcceptanceFixture {

    static String createAccessTokenCookie() {
        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNonceProvider.FIXED_VALUE);

        return RestAssured
                .given()
                .queryParams(query)
                .redirects()
                .follow(false)
                .log().all()

                .when()
                .get("/api/github/callback")

                .thenReturn()
                .getCookie(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME);
    }

    @Test
    @DisplayName("깃허브로 인가 요청을 보낸다.")
    void request_to_github_authorization_end_point() {
        RestAssured
                .given()
                .redirects()
                .follow(false)

                .when()
                .get("/api/sign-in/oauth/github")

                .then().log().all()
                .assertThat()
                .statusCode(HttpStatus.SC_OK)
                .body("endpoint",
                        is("https://www.github.com/login/oauth/authorize?client_id=test&state=randomNumber&redirect_uri=http://test.test"));
    }

    @Test
    @DisplayName("github authorize 엔드포인트 호출")
    void call_github_authorize_endpoint() {
        RestAssured
                .given()
                .redirects()
                .follow(false)

                .when()
                .get("/api/sign-in/oauth/github")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .header(HttpHeaders.SET_COOKIE, containsString("JSESSIONID"));
    }

    @Test
    @DisplayName("callback 엔드포인트 호출")
    void call_callback_end_point() {
        // given
        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNonceProvider.FIXED_VALUE);

        // when & then
        RestAssured
                .given()
                .queryParams(query)
                .redirects()
                .follow(false)
                .log().all()

                .when()
                .get("/api/github/callback")

                .then()
                .statusCode(HttpStatus.SC_TEMPORARY_REDIRECT);
    }

    @Test
    @DisplayName("callback 엔드 포인트가 호출되면 리디렉션을 통해 로그인이 시도된다.")
    void try_login_when_call_callback_end_point() {
        // given
        final MemberEntity memberEntity = MemberDummy.createDummy("test user", ACCESS_TOKEN.getCredential(), USER_ID, LOGIN_ID);

        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNonceProvider.FIXED_VALUE);

        memberRepository.save(memberEntity);

        // when & then
        RestAssured
                .given()
                .queryParams(query)
                .redirects()
                .follow(false)
                .log().all()

                .when()
                .get("/api/github/callback")

                .then().log().all()
                .statusCode(HttpStatus.SC_TEMPORARY_REDIRECT);
    }
}
