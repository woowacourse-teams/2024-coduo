package site.coduo.member.service.dto.auth;

import java.time.Duration;

import org.springframework.http.ResponseCookie;

public record SignInCookie(String credential) {

    public static final String SIGN_IN_COOKIE_NAME = "coduo_whoami";
    private static final String SERVICE_DOMAIN_NAME = "coduo.site";

    public ResponseCookie generate() {
        return ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .value(credential)
                .httpOnly(true)
                .secure(true)
                .domain(SERVICE_DOMAIN_NAME)
                .path("/")
                .build();
    }

    public ResponseCookie expire() {
        return ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .maxAge(Duration.ZERO)
                .domain(SERVICE_DOMAIN_NAME)
                .path("/")
                .build();
    }
}
