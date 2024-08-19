package site.coduo.member.controller;

import static site.coduo.common.config.filter.AccessTokenSessionFilter.ACCESS_TOKEN_SESSION_NAME;
import static site.coduo.common.config.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.net.URI;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import site.coduo.member.service.AuthService;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.SignInServiceResponse;
import site.coduo.member.service.dto.auth.SignInCheckResponse;
import site.coduo.member.service.dto.auth.SignInCookie;
import site.coduo.member.service.dto.auth.SignInWebResponse;
import site.coduo.member.service.dto.auth.SignUpRequest;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut(@CookieValue(name = SIGN_IN_COOKIE_NAME) final String signInToken) {
        final SignInCookie cookie = new SignInCookie(signInToken);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.expire().toString())
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final SignUpRequest request,
                                       @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME) final String accessToken
    ) {
        memberService.createMember(request.username(), accessToken);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<SignInWebResponse> signInCallback(
            @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME) final String accessToken
    ) {
        final SignInServiceResponse serviceResponse = authService.createSignInToken(accessToken);
        final ResponseCookie cookie = new SignInCookie(serviceResponse.token()).generate();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(SignInWebResponse.of(serviceResponse));
    }

    @GetMapping("/sign-in/check")
    public ResponseEntity<SignInCheckResponse> signInCheck(
            @CookieValue(name = SIGN_IN_COOKIE_NAME) final String signInToken
    ) {
        final boolean signedIn = authService.isSignedIn(signInToken);
        final SignInCheckResponse response = new SignInCheckResponse(signedIn);

        return ResponseEntity.ok()
                .body(response);
    }
}
