package site.coduo.acceptance;

import static site.coduo.common.config.web.filter.AccessTokenCookieFilter.TEMPORARY_ACCESS_TOKEN_COOKIE_NAME;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import io.restassured.RestAssured;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNonceProvider;
import site.coduo.member.domain.Member;

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
                .statusCode(307)
                .header("Location",
                        "https://www.github.com/login/oauth/authorize?client_id=test&state=randomNumber&redirect_uri=http://test.test");
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
                .statusCode(307);
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
        final Member member = Member.builder()
                .username("test user")
                .userId(FakeGithubApiClient.USER_ID)
                .loginId(FakeGithubApiClient.LOGIN_ID)
                .accessToken(FakeGithubOAuthClient.ACCESS_TOKEN.getCredential())
                .profileImage(FakeGithubApiClient.PROFILE_IMAGE)
                .build();
        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNonceProvider.FIXED_VALUE);

        memberRepository.save(member);

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
