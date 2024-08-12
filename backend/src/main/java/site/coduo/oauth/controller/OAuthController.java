package site.coduo.oauth.controller;

import java.net.URI;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.oauth.client.dto.TokenResponse;
import site.coduo.oauth.controller.dto.GithubAuthQuery;
import site.coduo.oauth.controller.dto.GithubAuthUri;
import site.coduo.oauth.controller.dto.GithubCallbackQuery;
import site.coduo.oauth.service.OAuthService;
import site.coduo.oauth.service.dto.CallbackContent;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OAuthController {

    public static final String STATE_SESSION_KEY = "state";
    public static final int STATE_SESSION_EXPIRE_IN = 30;
    public static final String ACCESS_TOKEN_KEY = "access token";
    public static final int ACCESS_TOKEN_EXPIRE_IN = 300;

    private final OAuthService oAuthService;

    @GetMapping("/sign-in/oauth/github")
    public ResponseEntity<Void> getGithubAuthCode(HttpSession session) {
        GithubAuthQuery query = GithubAuthQuery.of(oAuthService.createAuthorizationContent());
        GithubAuthUri githubAuthUri = new GithubAuthUri(query);

        session.setAttribute(STATE_SESSION_KEY, query.state());
        session.setMaxInactiveInterval(STATE_SESSION_EXPIRE_IN);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(githubAuthUri.toUri())
                .build();
    }

    @GetMapping("/github/callback")
    public ResponseEntity<Void> getAccessToken(@ModelAttribute GithubCallbackQuery query,
                                               @SessionAttribute(name = STATE_SESSION_KEY) String state,
                                               HttpSession session) {
        final TokenResponse tokenResponse = oAuthService.invokeCallback(CallbackContent.from(query, state));

        session.removeAttribute(STATE_SESSION_KEY);
        session.setAttribute(ACCESS_TOKEN_KEY, tokenResponse.getCredential());
        session.setMaxInactiveInterval(ACCESS_TOKEN_EXPIRE_IN);

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback/oauth/github")
    public ResponseEntity<Void> signIn() {
        return null;
    }
}
