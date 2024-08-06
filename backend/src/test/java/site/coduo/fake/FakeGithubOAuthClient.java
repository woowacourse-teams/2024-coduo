package site.coduo.fake;

import site.coduo.oauth.client.OAuthClient;
import site.coduo.oauth.client.dto.TokenRequest;

public class FakeGithubOAuthClient implements OAuthClient {

    public static final String ACCESS_TOKEN = "access-token";
    public static final String OAUTH_CLIENT_ID = "test";
    public static final String OAUTH_REDIRECT_URI = "http://test.test";

    @Override
    public String grant(TokenRequest request) {
        return ACCESS_TOKEN;
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
