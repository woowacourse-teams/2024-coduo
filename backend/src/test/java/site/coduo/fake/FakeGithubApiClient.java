package site.coduo.fake;

import site.coduo.oauth.client.GithubApiClient;
import site.coduo.oauth.client.dto.GithubUserRequest;
import site.coduo.oauth.client.dto.GithubUserResponse;

public class FakeGithubApiClient extends GithubApiClient {

    public static final String ACCESS_TOKEN = "access-token";
    public static final String LOGIN_ID = "login-id";
    public static final String USER_ID = "user-id";
    public static final String PROFILE_IMAGE = "image";

    @Override
    public GithubUserResponse getUser(final GithubUserRequest request) {
        return new GithubUserResponse(USER_ID, LOGIN_ID, PROFILE_IMAGE);
    }
}
