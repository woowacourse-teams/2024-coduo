package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.client.dto.TokenRequest;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.infrastructure.security.NonceProvider;
import site.coduo.member.service.dto.oauth.GithubAuthQuery;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GithubOAuthService {

    private final GithubOAuthClient oAuthClient;
    private final NonceProvider nonceProvider;
    private final JwtProvider jwtProvider;

    public GithubAuthQuery createAuthorizationContent() {

        return new GithubAuthQuery(
                oAuthClient.getOAuthClientId(),
                oAuthClient.getOAuthRedirectUri(),
                nonceProvider.generate()
        );
    }

    public String invokeOAuthCallback(final String code) {
        String redirectUri = oAuthClient.getOAuthRedirectUri();
        final TokenResponse tokenResponse = oAuthClient.grant(new TokenRequest(code, redirectUri));
        return jwtProvider.sign(tokenResponse.accessToken());
    }
}
