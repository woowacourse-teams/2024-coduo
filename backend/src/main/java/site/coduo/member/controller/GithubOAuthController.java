package site.coduo.member.controller;


import static site.coduo.common.config.web.filter.StateSessionFilter.STATE_SESSION_EXPIRE_IN_SECOND;
import static site.coduo.common.config.web.filter.StateSessionFilter.STATE_SESSION_NAME;

import java.net.URI;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.controller.docs.GithubOAuthControllerDocs;
import site.coduo.member.service.GithubOAuthService;
import site.coduo.member.service.dto.auth.AccessTokenCookie;
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
        final String encryptedAccessToken = githubOAuthService.invokeOAuthCallback(query.code());
        final AccessTokenCookie cookie = new AccessTokenCookie(encryptedAccessToken);
        final ResponseCookie responseCookie = cookie.generate(frontUrl);

        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .location(URI.create("https://" + frontUrl + "/callback"))
                .build();
    }
}
