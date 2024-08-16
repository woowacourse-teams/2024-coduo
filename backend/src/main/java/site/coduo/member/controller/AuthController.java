package site.coduo.member.controller;

import static site.coduo.member.controller.GithubOAuthController.ACCESS_TOKEN_SESSION_NAME;

import java.net.URI;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.controller.dto.auth.SignInCookie;
import site.coduo.member.controller.dto.auth.SignInWebResponse;
import site.coduo.member.controller.dto.auth.SignUpRequest;
import site.coduo.member.service.AuthService;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.SignInServiceResponse;

@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://coduo.site", "http://localhost:3000"})
@RestController
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut(@CookieValue(name = SignInCookie.SIGN_IN_COOKIE_NAME) String signInToken) {
        final SignInCookie cookie = new SignInCookie(signInToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.expire().toString())
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final SignUpRequest request,
                                       @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME, required = false) final String accessToken
    ) {
        memberService.createMember(request.username(), accessToken);

        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<SignInWebResponse> signInCallback(
            @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME, required = false) final String accessToken
    ) {
        final SignInServiceResponse serviceResponse = authService.createSignInToken(accessToken);
        final ResponseCookie cookie = new SignInCookie(serviceResponse.token()).generate();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .body(SignInWebResponse.of(serviceResponse));
    }
}
