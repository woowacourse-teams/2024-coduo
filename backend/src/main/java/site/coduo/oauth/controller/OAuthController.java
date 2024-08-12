package site.coduo.oauth.controller;

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
import site.coduo.oauth.controller.dto.GithubAuthQuery;
import site.coduo.oauth.controller.dto.GithubAuthUri;
import site.coduo.oauth.controller.dto.GithubCallbackQuery;
import site.coduo.oauth.infrastructure.security.CsrfConstant;
import site.coduo.oauth.service.OAuthService;
import site.coduo.oauth.service.dto.CallbackContent;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping("/sign-in/oauth/github")
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
    public ResponseEntity<Void> getAccessToken(@ModelAttribute GithubCallbackQuery query,
                                               @SessionAttribute(name = CsrfConstant.STATE_SESSION_KEY) String state) {
        oAuthService.login(new CallbackContent(query.code(), query.state(), state));

        return ResponseEntity.ok()
                .build();
    }
}
