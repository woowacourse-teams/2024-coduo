package site.coduo.oauth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.oauth.client.OAuthClient;
import site.coduo.oauth.client.dto.TokenRequest;
import site.coduo.oauth.client.dto.TokenResponse;
import site.coduo.oauth.infrastructure.security.NanceFactory;
import site.coduo.oauth.service.dto.CallbackContent;
import site.coduo.oauth.service.dto.OAuthTriggerContent;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class OAuthService {

    private final OAuthClient oAuthClient;
    private final NanceFactory nanceFactory;
    private final MemberRepository memberRepository;

    public OAuthTriggerContent createAuthorizationContent() {

        return OAuthTriggerContent.builder()
                .clientId(oAuthClient.getOAuthClientId())
                .redirectUri(oAuthClient.getOAuthRedirectUri())
                .state(nanceFactory.generate())
                .build();
    }

    @Transactional
    public void login(final CallbackContent content) {
        String redirectUri = oAuthClient.getOAuthRedirectUri();
        TokenResponse tokenResponse = oAuthClient.grant(new TokenRequest(content.code(), redirectUri));
        memberRepository.findByAccessToken(tokenResponse.accessToken());
    }
}
