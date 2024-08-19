package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.client.dto.TokenRequest;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.infrastructure.security.NanceProvider;
import site.coduo.member.service.dto.oauth.GithubAuthQuery;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GithubOAuthService {

    private final GithubOAuthClient oAuthClient;
    private final NanceProvider nanceProvider;

    public GithubAuthQuery createAuthorizationContent() {

        return new GithubAuthQuery(
                oAuthClient.getOAuthClientId(),
                oAuthClient.getOAuthRedirectUri(),
                nanceProvider.generate()
        );
    }

    public TokenResponse invokeOAuthCallback(final String code) {
        String redirectUri = oAuthClient.getOAuthRedirectUri();
        return oAuthClient.grant(new TokenRequest(code, redirectUri));
    }
}
