package site.coduo.oauth.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.coduo.oauth.client.OAuthClient;
import site.coduo.oauth.security.NanceFactory;
import site.coduo.oauth.service.dto.OAuthTriggerContent;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final OAuthClient oAuthClient;
    private final NanceFactory nanceFactory;

    public OAuthTriggerContent createAuthorizationContent() {

        return OAuthTriggerContent.builder()
                .clientId(oAuthClient.getOAuthClientId())
                .redirectUri(oAuthClient.getOAuthRedirectUri())
                .state(nanceFactory.generate())
                .build();
    }
}
