package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;

class AuthAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("로그인 검증 & 로그인 토큰을 발급한다.")
    void verify_login_and_publish_login_token() {
        final String sessionId = GithubAcceptanceTest.createAccessTokenThenReturnSessionId();
        final Member member = createMember();

        memberRepository.save(member);

        // when
        RestAssured
                .given()
                .cookie("JSESSIONID", sessionId)

                .when()
                .get("/api/sign-in/callback")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .cookie("coduo_whoami")
                .body("signedUp", is(true));
    }

    @Test
    @DisplayName("로그인 검증 & 로그인 토큰을 발급한다. - 로그인 실패 케이스")
    void verify_login_and_publish_login_token_dose_not_exists_case() {
        final String sessionId = GithubAcceptanceTest.createAccessTokenThenReturnSessionId();

        // when
        RestAssured
                .given()
                .cookie("JSESSIONID", sessionId)

                .when()
                .get("/api/sign-in/callback")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .cookie("coduo_whoami")
                .body("signedUp", is(false));
    }

    @Test
    @DisplayName("로그아웃 요청을 하면 JWT 쿠키가 삭제된다.")
    void remove_jwt_cookie_when_accept_logout_request() {
        // given
        final String loginToken = login();

        // when & then
        RestAssured
                .given()
                .cookie("coduo_whoami", loginToken)

                .when()
                .get("/api/sign-out")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    @DisplayName("회원의 로그인 상태를 확인한다.")
    void check_member_login_state() {
        // given
        final String loginToken = login();

        // when & then
        RestAssured
                .given()
                .cookie("coduo_whoami", loginToken)

                .when()
                .get("/api/sign-in/check")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .body("signedIn", is(true));
    }

    String login() {
        final String sessionId = GithubAcceptanceTest.createAccessTokenThenReturnSessionId();
        final Member member = createMember();

        memberRepository.save(member);

        return RestAssured
                .given()
                .cookie("JSESSIONID", sessionId)

                .when()
                .get("/api/sign-in/callback")

                .thenReturn()
                .cookie("coudo_whoami");
    }

    private Member createMember() {
        return Member.builder()
                .username("test user")
                .userId(FakeGithubApiClient.USER_ID)
                .loginId(FakeGithubApiClient.LOGIN_ID)
                .accessToken(FakeGithubOAuthClient.ACCESS_TOKEN.getCredential())
                .profileImage(FakeGithubApiClient.PROFILE_IMAGE)
                .build();
    }

    @Test
    @DisplayName("인가 정보를 통해 회원가입을 한다.")
    void sign_up_via_authorization_info() {
        // given
        final String sessionId = GithubAcceptanceTest.createAccessTokenThenReturnSessionId();
        final Map<String, String> body = Map.of("username", "닉네임");

        // when & then
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(body)
                .cookie("JSESSIONID", sessionId)

                .when()
                .post("/api/sign-up")

                .then().log().all()
                .statusCode(HttpStatus.SC_MOVED_TEMPORARILY);
    }
}
