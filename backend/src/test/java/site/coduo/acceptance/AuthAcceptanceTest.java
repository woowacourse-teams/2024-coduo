package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import static site.coduo.common.config.web.filter.AccessTokenCookieFilter.TEMPORARY_ACCESS_TOKEN_COOKIE_NAME;

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
import site.coduo.member.infrastructure.security.JwtProvider;

class AuthAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Test
    @DisplayName("로그인 검증 & 로그인 토큰을 발급한다.")
    void verify_login_and_publish_login_token() {
        final String cookie = GithubAcceptanceTest.createAccessTokenCookie();
        final Member member = createMember();

        memberRepository.save(member);

        // when
        RestAssured
                .given()
                .cookie(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME, cookie)

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
        final String tempCookie = GithubAcceptanceTest.createAccessTokenCookie();

        // when
        RestAssured
                .given()
                .cookie(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME, tempCookie)

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
        final String loginToken = jwtProvider.sign(FakeGithubOAuthClient.OAUTH_CLIENT_ID);

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
        final String signInToken = jwtProvider.sign(FakeGithubOAuthClient.OAUTH_CLIENT_ID);

        // when & then
        RestAssured
                .given()
                .cookie("coduo_whoami", signInToken)

                .when()
                .get("/api/sign-in/check")

                .then().log().all()
                .statusCode(HttpStatus.SC_OK)
                .body("signedIn", is(true));
    }

    @Test
    @DisplayName("인가 정보를 통해 회원가입을 한다.")
    void sign_up_via_authorization_info() {
        // given
        final String tempCookie = GithubAcceptanceTest.createAccessTokenCookie();
        final Map<String, String> body = Map.of("username", "닉네임");

        // when & then
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(body)
                .cookie(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME, tempCookie)

                .when()
                .post("/api/sign-up")

                .then().log().all()
                .statusCode(HttpStatus.SC_MOVED_TEMPORARILY);
    }

    @Test
    @DisplayName("액세스 토큰이 없을 때 예외를 던진다.")
    void no_access_token() {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)

                .when()
                .post("/api/sign-up")

                .then().log().all()
                .statusCode(HttpStatus.SC_UNAUTHORIZED);
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

}
