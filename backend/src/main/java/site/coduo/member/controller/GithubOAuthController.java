package site.coduo.member.controller;

import java.net.URI;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.controller.dto.oauth.GithubAuthQuery;
import site.coduo.member.controller.dto.oauth.GithubAuthUri;
import site.coduo.member.controller.dto.oauth.GithubCallbackQuery;
import site.coduo.member.controller.dto.oauth.GithubOAuthEndpoint;
import site.coduo.member.controller.dto.oauth.State;
import site.coduo.member.service.GithubOAuthService;

@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://coduo.site", "http://localhost:3000", "http://127.0.0.1:3000" })
@RestController
public class GithubOAuthController {

    public static final String ACCESS_TOKEN_SESSION_NAME = "access token";

    private static final String STATE_SESSION_NAME = "state";
    private static final int STATE_SESSION_EXPIRE_IN = 30;
    private static final int ACCESS_TOKEN_EXPIRE_IN = 300;

    private final GithubOAuthService githubOAuthService;

    @GetMapping("/sign-in/oauth/github")
    public ResponseEntity<GithubOAuthEndpoint> getGithubAuthCode(final HttpSession session) {
        log.info("--- 프론트로 깃허브 URI 보내기 시작 ---");
        final GithubAuthQuery query = githubOAuthService.createAuthorizationContent();
        final GithubAuthUri githubAuthUri = new GithubAuthUri(query);
        session.setAttribute(STATE_SESSION_NAME, query.state());
        session.setMaxInactiveInterval(STATE_SESSION_EXPIRE_IN);
        log.info("생성한 state 값: {}", query.state());
        log.info("--- 프론트로 깃허브 URI 보내기 종료 ---");
        return ResponseEntity.ok()
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .body(new GithubOAuthEndpoint(githubAuthUri.toPlainText()));
    }

    @GetMapping("/github/callback")
    public ResponseEntity<Void> getAccessToken(@ModelAttribute final GithubCallbackQuery query,
                                               @SessionAttribute(name = STATE_SESSION_NAME) final String state,
                                               final HttpServletRequest request,
                                               final HttpSession session) {

        log.info("--- 깃허브에서 온 콜백 시작 ---");
        log.info("세션에 저장된 state: {}", state);
        log.info("깃허브에서 보내주는 state: {}", query.state());
        log.info("쿠키 오나요?!: {}", request.getCookies().length);
        State savedState = new State(state);
        savedState.validate(new State(query.state()));
        final TokenResponse tokenResponse = githubOAuthService.invokeOAuthCallback(query.code());

        session.removeAttribute(STATE_SESSION_NAME);
        session.setAttribute(ACCESS_TOKEN_SESSION_NAME, tokenResponse.accessToken());
        session.setMaxInactiveInterval(ACCESS_TOKEN_EXPIRE_IN);

        log.info("--- 깃허브에서 온 콜백 종료 ---");
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .location(URI.create("https://coduo.site/callback"))
                .build();
    }
}
