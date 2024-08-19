package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import io.restassured.RestAssured;
import site.coduo.fake.FakeJwtProvider;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.service.dto.auth.SignInCookie;

class MemberAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("회원의 정보를 조회한다.")
    void search_member_info() {
        // given
        final Member member = Member.builder()
                .userId(FakeJwtProvider.MEMBER_SUBJECT)
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();

        final String loginToken = login(member);

        // when & then
        RestAssured
                .given()
                .cookie(SignInCookie.SIGN_IN_COOKIE_NAME, loginToken)

                .when()
                .get("/api/member")

                .then()
                .statusCode(HttpStatus.SC_OK)
                .body("username", is(member.getUsername()));
    }

    String login(Member member) {
        final String sessionId = GithubAcceptanceTest.createAccessTokenThenReturnSessionId();

        memberRepository.save(member);

        return RestAssured
                .given()
                .cookie("JSESSIONID", sessionId)

                .when()
                .get("/api/sign-in/callback")

                .thenReturn()
                .cookie("coudo_whoami");
    }
}
