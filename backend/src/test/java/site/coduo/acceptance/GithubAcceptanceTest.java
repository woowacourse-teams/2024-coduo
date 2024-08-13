package site.coduo.acceptance;

import static org.hamcrest.Matchers.containsString;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;

import io.restassured.RestAssured;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNanceGenerator;
import site.coduo.member.domain.Member;

class GithubAcceptanceTest extends AcceptanceFixture {

    static String createAccessTokenThenReturnSessionId() {
        final String session = callAuthorizeThenReturnSessionId();

        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNanceGenerator.FIXED_VALUE);

        RestAssured
                .given()
                .queryParams(query)
                .sessionId("JSESSIONID", session)
                .redirects()
                .follow(false)
                .log().all()

                .when()
                .get("/api/github/callback")

                .then()
                .statusCode(HttpStatus.SC_MOVED_TEMPORARILY);

        return session;
    }

    static String callAuthorizeThenReturnSessionId() {
        return RestAssured
                .given()
                .redirects()
                .follow(false)

                .when()
                .get("/api/sign-in/oauth/github")

                .thenReturn()
                .getSessionId();
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
                .statusCode(HttpStatus.SC_MOVED_TEMPORARILY)
                .header(HttpHeaders.SET_COOKIE, containsString("JSESSIONID"));
    }

    @Test
    @DisplayName("callback 엔드포인트 호출")
    void call_callback_end_point() {
        // given
        final String session = callAuthorizeThenReturnSessionId();

        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNanceGenerator.FIXED_VALUE);

        // when & then
        RestAssured
                .given()
                .queryParams(query)
                .sessionId("JSESSIONID", session)
                .redirects()
                .follow(false)
                .log().all()

                .when()
                .get("/api/github/callback")

                .then()
                .statusCode(HttpStatus.SC_MOVED_TEMPORARILY);
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
        final String session = callAuthorizeThenReturnSessionId();
        final Map<String, String> query = Map.of("code", "authorization code",
                "state", FixedNanceGenerator.FIXED_VALUE);

        memberRepository.save(member);

        // when & then
        RestAssured
                .given()
                .queryParams(query)
                .sessionId("JSESSIONID", session)
                .log().all()

                .when()
                .get("/api/github/callback")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .cookie("coduo_whoami");
    }
}
