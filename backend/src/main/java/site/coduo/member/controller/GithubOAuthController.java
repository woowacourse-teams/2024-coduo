package site.coduo.member.controller;


import static site.coduo.common.config.filter.AccessTokenSessionFilter.ACCESS_TOKEN_EXPIRE_IN_SECOND;
import static site.coduo.common.config.filter.AccessTokenSessionFilter.ACCESS_TOKEN_SESSION_NAME;
import static site.coduo.common.config.filter.StateSessionFilter.STATE_SESSION_EXPIRE_IN_SECOND;
import static site.coduo.common.config.filter.StateSessionFilter.STATE_SESSION_NAME;

import java.net.URI;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.controller.docs.GithubOAuthControllerDocs;
import site.coduo.member.service.GithubOAuthService;
import site.coduo.member.service.dto.oauth.GithubAuthQuery;
import site.coduo.member.service.dto.oauth.GithubAuthUri;
import site.coduo.member.service.dto.oauth.GithubCallbackQuery;
import site.coduo.member.service.dto.oauth.GithubOAuthEndpoint;

@Slf4j
@RequiredArgsConstructor
@RestController
public class GithubOAuthController implements GithubOAuthControllerDocs {

    private final GithubOAuthService githubOAuthService;

    @Value("${front.url}")
    private String frontUrl;

    @GetMapping("/sign-in/oauth/github")
    public ResponseEntity<GithubOAuthEndpoint> getGithubAuthCode(final HttpSession session) {
        final GithubAuthQuery query = githubOAuthService.createAuthorizationContent();
        final GithubAuthUri githubAuthUri = new GithubAuthUri(query);

        session.setAttribute(STATE_SESSION_NAME, query.state());
        session.setMaxInactiveInterval(STATE_SESSION_EXPIRE_IN_SECOND);
        return ResponseEntity.ok()
                .body(new GithubOAuthEndpoint(githubAuthUri.toPlainText()));
    }

    @GetMapping("/github/callback")
    public ResponseEntity<Void> getAccessToken(@ModelAttribute final GithubCallbackQuery query,
                                               final HttpSession session) {
        final TokenResponse tokenResponse = githubOAuthService.invokeOAuthCallback(query.code());

        session.setAttribute(ACCESS_TOKEN_SESSION_NAME, tokenResponse.accessToken());
        session.setMaxInactiveInterval(ACCESS_TOKEN_EXPIRE_IN_SECOND);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("https://" + frontUrl + "/callback"))
                .build();
    }
}
