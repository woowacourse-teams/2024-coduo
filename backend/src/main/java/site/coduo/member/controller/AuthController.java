package site.coduo.member.controller;

import static site.coduo.member.controller.GithubOAuthController.ACCESS_TOKEN_SESSION_NAME;

import java.net.URI;
import java.time.Duration;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import site.coduo.member.controller.docs.AuthControllerDocs;
import site.coduo.member.controller.dto.member.SignInWebResponse;
import site.coduo.member.controller.dto.member.SignUpRequest;
import site.coduo.member.service.AuthService;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.SignInServiceResponse;

@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(value = {"https://coduo.site", "http://localhost:3000" })
@RestController
public class AuthController implements AuthControllerDocs {

    private static final String SIGN_IN_COOKIE_NAME = "coduo_whoami";
    private static final String SERVICE_DOMAIN_NAME = "coduo.site";

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut() {
        final ResponseCookie expireCookie = ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .maxAge(Duration.ZERO)
                .domain(SERVICE_DOMAIN_NAME)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, expireCookie.toString())
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final SignUpRequest request,
                                       @SessionAttribute(value = ACCESS_TOKEN_SESSION_NAME) final String accessToken) {
        memberService.createMember(request.username(), accessToken);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<SignInWebResponse> signInCallback(
            @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME) final String accessToken,
            final HttpSession session) {
        final SignInServiceResponse serviceResponse = authService.createSignInToken(accessToken);

        session.invalidate();

        final ResponseCookie cookie = ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .value(serviceResponse.token())
                .httpOnly(true)
                .secure(true)
                .domain(SERVICE_DOMAIN_NAME)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(SignInWebResponse.of(serviceResponse));
    }
}
