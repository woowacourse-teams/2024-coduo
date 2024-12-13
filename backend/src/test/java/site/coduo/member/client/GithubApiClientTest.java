package site.coduo.member.client;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fake.FakeClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.exception.ExternalApiCallException;
import site.coduo.member.infrastructure.http.Bearer;

class GithubApiClientTest {


    @Test
    @DisplayName("Github로부터 회원정보를 불러온다.")
    void get_member_from_github() {
        // given
        final FakeClient client = new FakeClient();
        final GithubApiClient githubApiClient = new GithubApiClient(client);
        final GithubUserRequest request = new GithubUserRequest(new Bearer("ok"));

        // when
        final GithubUserResponse response = githubApiClient.getUser(request);

        // then
        assertThat(response).isEqualTo(new GithubUserResponse("userId", "login", "avatar_url"));
    }

    @Test
    @DisplayName("토큰값이 잘못된 경우 예외 발생한다.")
    void throw_exception_when_token_is_invalid() {
        // given
        final FakeClient client = new FakeClient();
        final GithubApiClient githubApiClient = new GithubApiClient(client);
        final GithubUserRequest request = new GithubUserRequest(new Bearer(""));

        // when & then
        assertThatThrownBy(() -> githubApiClient.getUser(request))
                .isInstanceOf(ExternalApiCallException.class);
    }
}
