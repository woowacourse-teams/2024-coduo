package site.coduo.oauth.client;

import site.coduo.oauth.client.dto.TokenRequest;

public interface OAuthClient {

    String grant(TokenRequest request);

    String getOAuthClientId();

    String getOAuthRedirectUri();
}
