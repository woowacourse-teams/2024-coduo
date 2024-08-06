package site.coduo.oauth.controller;

import java.time.LocalDateTime;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.coduo.oauth.controller.dto.GithubAuthQuery;
import site.coduo.oauth.controller.dto.GithubAuthUri;
import site.coduo.oauth.controller.dto.StateSession;
import site.coduo.oauth.service.OAuthService;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    @GetMapping
    public ResponseEntity<Void> getGithubAuthCode(HttpSession session) {
        GithubAuthQuery query = GithubAuthQuery.of(oAuthService.createAuthorizationContent());
        GithubAuthUri githubAuthUri = new GithubAuthUri(query);

        session.setAttribute(StateSession.SESSION_NAME, new StateSession(query.state(), LocalDateTime.now()));
        session.setMaxInactiveInterval(StateSession.SESSION_EXPIRE_MIN);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(githubAuthUri.toUri())
                .build();
    }

}
