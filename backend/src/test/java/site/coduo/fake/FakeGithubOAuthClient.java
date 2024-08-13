package site.coduo.fake;

import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.client.dto.TokenRequest;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.infrastructure.http.Bearer;

public class FakeGithubOAuthClient extends GithubOAuthClient {

    public static final Bearer ACCESS_TOKEN = new Bearer("access-token");
    public static final String OAUTH_CLIENT_ID = "test";
    public static final String OAUTH_REDIRECT_URI = "http://test.test";

    @Override
    public TokenResponse grant(TokenRequest request) {
        return new TokenResponse(ACCESS_TOKEN, "", Bearer.SCHEME);
    }

    @Override
    public String getOAuthClientId() {
        return OAUTH_CLIENT_ID;
    }

    @Override
    public String getOAuthRedirectUri() {
        return OAUTH_REDIRECT_URI;
    }
}
