package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.client.GithubOAuthClient;
import site.coduo.member.client.dto.TokenRequest;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.infrastructure.security.NanceGenerator;
import site.coduo.member.service.dto.CallbackContent;
import site.coduo.member.service.dto.GithubAuthQuery;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class GithubOAuthService {

    private final GithubOAuthClient oAuthClient;
    private final NanceGenerator nanceGenerator;

    public GithubAuthQuery createAuthorizationContent() {

        return new GithubAuthQuery(
                oAuthClient.getOAuthClientId(),
                oAuthClient.getOAuthRedirectUri(),
                nanceGenerator.generate()
        );
    }

    public TokenResponse invokeOAuthCallback(final CallbackContent content) {
        content.validateState();
        nanceGenerator.verify(content.savedState(), content.returnedState());
        String redirectUri = oAuthClient.getOAuthRedirectUri();
        return oAuthClient.grant(new TokenRequest(content.code(), redirectUri));
    }
}
