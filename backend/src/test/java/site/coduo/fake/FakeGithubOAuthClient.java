package site.coduo.fake;

import site.coduo.common.infrastructure.security.Bearer;
import site.coduo.oauth.client.GithubOAuthClient;
import site.coduo.oauth.client.dto.TokenRequest;
import site.coduo.oauth.client.dto.TokenResponse;

public class FakeGithubOAuthClient extends GithubOAuthClient {

    public static final String ACCESS_TOKEN = "access-token";
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
