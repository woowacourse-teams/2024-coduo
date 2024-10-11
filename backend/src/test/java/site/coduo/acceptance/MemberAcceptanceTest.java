package site.coduo.acceptance;

import static org.hamcrest.Matchers.is;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import io.restassured.RestAssured;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;

class MemberAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("회원의 정보를 조회한다.")
    void search_member_info() {
        // given
        final Member member = Member.builder()
                .userId("123")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();

        final String loginToken = jwtProvider.sign(member.getUserId());
        memberRepository.save(member);

        // when & then
        RestAssured
                .given()
                .cookie(SIGN_IN_COOKIE_NAME, loginToken)

                .when()
                .get("/api/member")

                .then()
                .statusCode(HttpStatus.SC_OK)
                .body("username", is(member.getUsername()));
    }

    @Test
    @DisplayName("회원을 삭제한다.")
    void delete_member() {
        //given
        final Member member = Member.builder()
                .userId("123")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();

        final String loginToken = jwtProvider.sign(member.getUserId());
        memberRepository.save(member);

        //when && then
        RestAssured
                .given()
                .cookie(SIGN_IN_COOKIE_NAME, loginToken)

                .when()
                .delete("/api/member")

                .then()
                .statusCode(HttpStatus.SC_NO_CONTENT);
    }
}
