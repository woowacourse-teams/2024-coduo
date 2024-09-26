package site.coduo.member.service.dto.auth;

import static site.coduo.common.config.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;

import java.time.Duration;

import org.springframework.http.ResponseCookie;

public record SignInCookie(String credential) {

    public ResponseCookie generate(final String domain) {
        return ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .value(credential)
                .httpOnly(true)
                .secure(true)
                .domain(domain)
                .path("/")
                .build();
    }

    public ResponseCookie expire(final String domain) {
        return ResponseCookie.from(SIGN_IN_COOKIE_NAME)
                .maxAge(Duration.ZERO)
                .domain(domain)
                .path("/")
                .build();
    }
}
