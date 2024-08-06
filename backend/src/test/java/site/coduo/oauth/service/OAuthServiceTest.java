package site.coduo.oauth.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNanceFactory;
import site.coduo.oauth.service.dto.OAuthTriggerContent;

@SpringBootTest
@Import(TestConfig.class)
class OAuthServiceTest {

    @Autowired
    private OAuthService oAuthService;

    @Test
    @DisplayName("인가 요청을 위한 정보를 생성한다.")
    void create_info_for_authorization_request_to_third_party() {
        // given
        OAuthTriggerContent expect = OAuthTriggerContent.builder()
                .clientId(FakeGithubOAuthClient.OAUTH_CLIENT_ID)
                .redirectUri(FakeGithubOAuthClient.OAUTH_REDIRECT_URI)
                .state(FixedNanceFactory.FIXED_VALUE)
                .build();

        // when
        OAuthTriggerContent response = oAuthService.createAuthorizationContent();

        // then
        assertThat(response)
                .isEqualTo(expect);
    }
}
