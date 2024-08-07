package site.coduo.oauth.client;

import site.coduo.oauth.client.dto.TokenRequest;
import site.coduo.oauth.client.dto.TokenResponse;

public interface OAuthClient {

    TokenResponse grant(TokenRequest request);

    String getOAuthClientId();

    String getOAuthRedirectUri();
}
