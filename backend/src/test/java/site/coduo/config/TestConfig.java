package site.coduo.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNanceFactory;
import site.coduo.oauth.client.OAuthClient;
import site.coduo.oauth.security.NanceFactory;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public NanceFactory fakeNanceFactory() {
        return new FixedNanceFactory();
    }

    @Bean
    @Primary
    public OAuthClient fakeOAuthClient() {
        return new FakeGithubOAuthClient();
    }
}
