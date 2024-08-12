package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.common.exception.AuthorizationException;
import site.coduo.config.TestConfig;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNanceGenerator;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.service.dto.CallbackContent;
import site.coduo.member.service.dto.OAuthTriggerContent;

@SpringBootTest
@Import(TestConfig.class)
class GithubOAuthServiceTest {

    @Autowired
    private GithubOAuthService githubOAuthService;

    @Test
    @DisplayName("인가 요청을 위한 정보를 생성한다.")
    void create_info_for_authorization_request_to_third_party() {
        // given
        final OAuthTriggerContent expect = OAuthTriggerContent.builder()
                .clientId(FakeGithubOAuthClient.OAUTH_CLIENT_ID)
                .redirectUri(FakeGithubOAuthClient.OAUTH_REDIRECT_URI)
                .state(FixedNanceGenerator.FIXED_VALUE)
                .build();

        // when
        final OAuthTriggerContent response = githubOAuthService.createAuthorizationContent();

        // then
        assertThat(response).isEqualTo(expect);
    }

    @Test
    @DisplayName("엑세스 토큰을 발급 받아온다.")
    void get_access_token() {
        // given
        final CallbackContent content = new CallbackContent("code", "nonce", "nonce");

        // when
        final TokenResponse tokenResponse = githubOAuthService.invokeOAuthCallback(content);

        // then
        assertThat(tokenResponse.accessToken()).isEqualTo(FakeGithubOAuthClient.ACCESS_TOKEN);
    }

    @Test
    @DisplayName("state 값이 호출 전/후가 다르면 CSRF 보안 공격으로 간주한다.")
    void regard_csrf_attack_when_state_value_is_different_between_before_call_and_after() {
        // given
        final CallbackContent content = new CallbackContent("code", "nonce", "nonce2");

        // when & then
        assertThatThrownBy(() -> githubOAuthService.invokeOAuthCallback(content))
                .isInstanceOf(AuthorizationException.class);
    }
}
