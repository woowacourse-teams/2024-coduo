package site.coduo.member.service.dto.auth;

import static site.coduo.common.config.web.filter.AccessTokenCookieFilter.TEMPORARY_ACCESS_TOKEN_COOKIE_NAME;

import java.time.Duration;

import org.springframework.http.ResponseCookie;

public record AccessTokenCookie(String accessToken) {

    public static ResponseCookie expire(final String domain) {

        return ResponseCookie.from(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME)
                .maxAge(Duration.ZERO)
                .domain(domain)
                .path("/")
                .build();
    }

    public ResponseCookie generate(final String domain) {

        return ResponseCookie.from(TEMPORARY_ACCESS_TOKEN_COOKIE_NAME)
                .value(accessToken)
                .httpOnly(true)
                .secure(true)
                .domain(domain)
                .path("/")
                .build();
    }
}
