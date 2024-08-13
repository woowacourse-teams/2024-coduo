package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.service.dto.SignInServiceResponse;

@SpringBootTest
@Import(TestConfig.class)
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

    @AfterEach
    void tearDown() {
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("엑세스 토큰으로 회원을 조회한다.")
    void search_member_by_access_token() {
        // given
        final Member member = createMember("username", FakeGithubApiClient.ACCESS_TOKEN, FakeGithubApiClient.USER_ID);

        // when
        final SignInServiceResponse signInToken = authService.createSignInToken(member.getAccessToken());

        // then
        assertThatCode(() -> jwtProvider.verify(signInToken.token()))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("존재하지 않는 엑세스 토큰으로 조회화면 빈 토큰을  생성한다.")
    void throw_exception_when_search_by_does_not_exists_access_token() {
        // given
        final String token = "does not exist token";

        // when
        final SignInServiceResponse signInToken = authService.createSignInToken(token);

        // then
        assertThat(signInToken.token()).isEmpty();
    }

    private Member createMember(final String username, final String accessToken, final String userId) {
        final Member member = Member.builder()
                .username(username)
                .accessToken(accessToken)
                .loginId("")
                .userId(userId)
                .profileImage("")
                .build();

        return memberRepository.save(member);
    }

    @Test
    @DisplayName("로그인 토큰을 생성할 때 회원이 엑세스 토큰을 갱신한다.")
    void renewal_member_access_token_when_create_sign_in_token() {
        // given
        final Member member = createMember("username", "origin", FakeGithubApiClient.USER_ID);

        // when
        authService.createSignInToken("change");

        // then
        assertThat(memberRepository.findById(member.getId()).orElseThrow())
                .extracting("accessToken")
                .isEqualTo("change");
    }
}
