package site.coduo.oauth.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.oauth.client.dto.TokenResponse;
import site.coduo.oauth.controller.dto.GithubAuthQuery;
import site.coduo.oauth.controller.dto.GithubAuthUri;
import site.coduo.oauth.controller.dto.GithubCallbackQuery;
import site.coduo.oauth.infrastructure.security.CsrfConstant;
import site.coduo.oauth.service.OAuthService;

@Slf4j
@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/github/authorize")
    public ResponseEntity<Void> getGithubAuthCode(HttpSession session) {
        GithubAuthQuery query = GithubAuthQuery.of(oAuthService.createAuthorizationContent());
        GithubAuthUri githubAuthUri = new GithubAuthUri(query);

        session.setAttribute(CsrfConstant.STATE_SESSION_KEY, query.state());
        session.setMaxInactiveInterval(CsrfConstant.SESSION_EXPIRE_IN);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(githubAuthUri.toUri())
                .build();
    }

    @GetMapping("/github/callback")
    public ResponseEntity<String> getAccessToken(@ModelAttribute GithubCallbackQuery query,
                                                 HttpSession session) {
        session.removeAttribute(CsrfConstant.STATE_SESSION_KEY);
        TokenResponse accessToken = oAuthService.getAccessToken(query.code());
        log.info("ACCESS TOKEN: {}", accessToken);
        return ResponseEntity.ok(accessToken.accessToken());
    }
}
