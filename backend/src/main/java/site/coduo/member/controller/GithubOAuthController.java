package site.coduo.member.controller;

import java.net.URI;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.controller.docs.GithubOAuthControllerDocs;
import site.coduo.member.controller.dto.oauth.GithubAuthQuery;
import site.coduo.member.controller.dto.oauth.GithubAuthUri;
import site.coduo.member.controller.dto.oauth.GithubCallbackQuery;
import site.coduo.member.controller.dto.oauth.State;
import site.coduo.member.service.GithubOAuthService;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(value = {"https://coduo.site", "http://localhost:3000" })
@RequestMapping("/api")
@RestController
public class GithubOAuthController implements GithubOAuthControllerDocs {

    public static final String ACCESS_TOKEN_SESSION_NAME = "access token";

    private static final String STATE_SESSION_NAME = "state";
    private static final int STATE_SESSION_EXPIRE_IN = 30;
    private static final int ACCESS_TOKEN_EXPIRE_IN = 300;

    private final GithubOAuthService githubOAuthService;

    @GetMapping("/sign-in/oauth/github")
    public ResponseEntity<Void> getGithubAuthCode(final HttpSession session,
                                                  @RequestHeader(name = HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, required = false) final String origin
    ) {
        final GithubAuthQuery query = githubOAuthService.createAuthorizationContent();
        final GithubAuthUri githubAuthUri = new GithubAuthUri(query);

        session.setAttribute(STATE_SESSION_NAME, query.state());
        session.setMaxInactiveInterval(STATE_SESSION_EXPIRE_IN);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(githubAuthUri.toUri())
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origin)
                .build();
    }

    @GetMapping("/github/callback")
    public ResponseEntity<Void> getAccessToken(@ModelAttribute final GithubCallbackQuery query,
                                               @SessionAttribute(name = STATE_SESSION_NAME) final String state,
                                               final HttpSession session) {

        State savedState = new State(state);
        savedState.validate(new State(query.state()));
        final TokenResponse tokenResponse = githubOAuthService.invokeOAuthCallback(query.code());

        session.removeAttribute(STATE_SESSION_NAME);
        session.setAttribute(ACCESS_TOKEN_SESSION_NAME, tokenResponse.getCredential());
        session.setMaxInactiveInterval(ACCESS_TOKEN_EXPIRE_IN);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }
}
