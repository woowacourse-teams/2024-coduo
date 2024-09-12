package site.coduo.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.fake.FixedNonceProvider;
import site.coduo.fake.TestEventStreamRegistry;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.infrastructure.security.NonceProvider;
import site.coduo.sync.service.EventStreamsRegistry;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public NonceProvider fakeNonceFactory() {
        return new FixedNonceProvider();
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
    public ThreadPoolTaskScheduler testThreadPoolTaskScheduler() {
        return new ThreadPoolTaskScheduler();
    }

    @Bean
    @Primary
    public EventStreamsRegistry testEventStreamRegistry() {
        return new TestEventStreamRegistry();
    }
}
