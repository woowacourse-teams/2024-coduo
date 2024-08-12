package site.coduo.oauth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.oauth.client.GithubOAuthClient;
import site.coduo.oauth.client.dto.TokenRequest;
import site.coduo.oauth.client.dto.TokenResponse;
import site.coduo.oauth.infrastructure.security.NanceGenerator;
import site.coduo.oauth.service.dto.CallbackContent;
import site.coduo.oauth.service.dto.OAuthTriggerContent;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GithubOAuthService {

    private final GithubOAuthClient oAuthClient;
    private final NanceGenerator nanceGenerator;

    public OAuthTriggerContent createAuthorizationContent() {

        return OAuthTriggerContent.builder()
                .clientId(oAuthClient.getOAuthClientId())
                .redirectUri(oAuthClient.getOAuthRedirectUri())
                .state(nanceGenerator.generate())
                .build();
    }

    public TokenResponse invokeOAuthCallback(final CallbackContent content) {
        nanceGenerator.verify(content.savedState(), content.returnedState());
        String redirectUri = oAuthClient.getOAuthRedirectUri();
        return oAuthClient.grant(new TokenRequest(content.code(), redirectUri));
    }
}
