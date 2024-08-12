package site.coduo.member.controller;

import static site.coduo.member.controller.GithubOAuthController.ACCESS_TOKEN_SESSION_NAME;

import java.time.Duration;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import site.coduo.member.service.AuthService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private static final String SIGN_IN_COOKIE_NAME = "coduo_whoami";

    private final AuthService authService;

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut() {
        final ResponseCookie expireCookie = ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .maxAge(Duration.ZERO)
                .domain("coduo.site")
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, expireCookie.toString())
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<Void> signIn(@SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME) final String accessToken,
                                       final HttpSession session) {
        final String signInToken = authService.createSignInToken(accessToken);
        session.removeAttribute(ACCESS_TOKEN_SESSION_NAME);

        final ResponseCookie cookie = ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .value(signInToken)
                .httpOnly(true)
                .secure(true)
                .domain("coduo.site")
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}
