package site.coduo.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FakeJwtProvider;
import site.coduo.fake.FixedNanceProvider;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.infrastructure.security.NanceProvider;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public NanceProvider fakeNanceFactory() {
        return new FixedNanceProvider();
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

    @Bean
    @Primary
    public JwtProvider fakeJwtProvider() {
        return new FakeJwtProvider();
    }
}
