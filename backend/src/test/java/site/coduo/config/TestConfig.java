package site.coduo.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNanceFactory;
import site.coduo.member.client.GithubApiClient;
import site.coduo.oauth.client.GithubOAuthClient;
import site.coduo.oauth.infrastructure.security.NanceFactory;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public NanceFactory fakeNanceFactory() {
        return new FixedNanceFactory();
    }

    @Bean
    @Primary
    public GithubOAuthClient fakeGithubOAuthClient() {
        return new FakeGithubOAuthClient();
    }

    @Bean
    @Primary
    public GithubApiClient fakeGithubApiClient() {
        return new FakeGithubApiClient();
    }
}
