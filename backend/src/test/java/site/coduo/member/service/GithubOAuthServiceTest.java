package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNonceProvider;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.service.dto.oauth.GithubAuthQuery;

@SpringBootTest
@Import(TestConfig.class)
class GithubOAuthServiceTest {

    @Autowired
    private GithubOAuthService githubOAuthService;

    @Autowired
    private JwtProvider jwtProvider;

    @Test
    @DisplayName("인가 요청을 위한 정보를 생성한다.")
    void create_info_for_authorization_request_to_third_party() {
        // given
        final GithubAuthQuery expect = new GithubAuthQuery(
                FakeGithubOAuthClient.OAUTH_CLIENT_ID,
                FakeGithubOAuthClient.OAUTH_REDIRECT_URI,
                FixedNonceProvider.FIXED_VALUE
        );

        // when
        final GithubAuthQuery response = githubOAuthService.createAuthorizationContent();

        // then
        assertThat(response).isEqualTo(expect);
    }

    @Test
    @DisplayName("엑세스 토큰을 발급 받아온다.")
    void get_access_token() {
        // given
        final String code = "code";

        // when
        final String tempToken = githubOAuthService.invokeOAuthCallback(code);

        // then
        assertThatCode(() -> jwtProvider.extractSubject(tempToken))
                .doesNotThrowAnyException();
    }
}
