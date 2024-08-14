package site.coduo.member.controller;

import static site.coduo.member.controller.GithubOAuthController.ACCESS_TOKEN_SESSION_NAME;

import java.net.URI;
import java.time.Duration;
import java.util.Arrays;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.controller.dto.member.SignInWebResponse;
import site.coduo.member.controller.dto.member.SignUpRequest;
import site.coduo.member.service.AuthService;
import site.coduo.member.service.MemberService;
import site.coduo.member.service.dto.SignInServiceResponse;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = {"https://coduo.site", "http://localhost:3000", "http://localhost:8080" })
@RestController
public class AuthController {

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
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .build();
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Void> signUp(@RequestBody final SignUpRequest request,
                                       final HttpServletRequest httpRequest,
                                       @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME, required = false) final String accessToken
    ) {
        log.info("-----회원가입 시작-----");
        log.info("회원 가입 쿠키 불러오나? -> {}", httpRequest.getCookies().length);
        log.info("회원 가입 엑세스 토큰 -> {}", accessToken);
        memberService.createMember(request.username(), accessToken);

        log.info("-----회원가입 종료-----");
        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .location(URI.create("/api/sign-in/callback"))
                .build();
    }

    @GetMapping("/sign-in/callback")
    public ResponseEntity<SignInWebResponse> signInCallback(
            final HttpServletRequest request,
            @SessionAttribute(name = ACCESS_TOKEN_SESSION_NAME, required = false) final String accessToken
    ) {

        log.info("------로그인 시작------");
        log.info("로그인에서 엑세스 토큰: {}", accessToken);
        log.info("로그인 과정에서 쿠키: {}", request.getCookies().length);
        Arrays.stream(request.getCookies())
                .forEach(cookie -> log.info("쿠키 이름: {}, 값: {}", cookie.getName(),
                        cookie.getAttribute(cookie.getName())));

        final SignInServiceResponse serviceResponse = authService.createSignInToken(accessToken);
        final ResponseCookie cookie = ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .value(serviceResponse.token())
                .httpOnly(true)
                .secure(true)
                .domain(SERVICE_DOMAIN_NAME)
                .path("/")
                .build();

        log.info("------로그인 종료------");

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .body(SignInWebResponse.of(serviceResponse));
    }
}
