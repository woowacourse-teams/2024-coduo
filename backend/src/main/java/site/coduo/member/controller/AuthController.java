package site.coduo.member.controller;

import static site.coduo.common.config.web.filter.AccessTokenCookieFilter.TEMPORARY_ACCESS_TOKEN_COOKIE_NAME;
import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

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

import lombok.RequiredArgsConstructor;
import site.coduo.member.controller.docs.AuthControllerDocs;
import site.coduo.member.service.AuthService;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.SignInServiceResponse;
import site.coduo.member.service.dto.auth.AccessTokenCookie;
import site.coduo.member.service.dto.auth.SignInCheckResponse;
import site.coduo.member.service.dto.auth.SignInCookie;
import site.coduo.member.service.dto.auth.SignInWebResponse;
import site.coduo.member.service.dto.auth.SignUpRequest;

@RequiredArgsConstructor
@RestController
public class AuthController implements AuthControllerDocs {

    public static final String PRODUCT_DOMAIN = ".coduo.site";

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/sign-out")
    public ResponseEntity<Void> signOut(@CookieValue(name = SIGN_IN_COOKIE_NAME) final String signInToken) {
        final ResponseCookie expire = SignInCookie.expire(PRODUCT_DOMAIN);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, expire.toString())
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final SignUpRequest request,
                                       @CookieValue(name = TEMPORARY_ACCESS_TOKEN_COOKIE_NAME) final String encryptedAccessToken
    ) {
        memberService.createMember(request.username(), encryptedAccessToken);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<SignInWebResponse> signInCallback(
            @CookieValue(name = TEMPORARY_ACCESS_TOKEN_COOKIE_NAME) final String encryptedAccessToken
    ) {
        final SignInServiceResponse serviceResponse = authService.createSignInToken(encryptedAccessToken);
        final ResponseCookie signInCookie = new SignInCookie(serviceResponse.token()).generate(PRODUCT_DOMAIN);
        final ResponseCookie expireTemporaryAccessToken = AccessTokenCookie.expire(PRODUCT_DOMAIN);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, signInCookie.toString(), expireTemporaryAccessToken.toString())
                .body(SignInWebResponse.of(serviceResponse));
    }

    @GetMapping("/sign-in/check")
    public ResponseEntity<SignInCheckResponse> signInCheck(
            @CookieValue(name = SIGN_IN_COOKIE_NAME, required = false) final String signInToken
    ) {
        final boolean signedIn = authService.isSignedIn(signInToken);
        final SignInCheckResponse response = new SignInCheckResponse(signedIn);

        return ResponseEntity.ok()
                .body(response);
    }
}
