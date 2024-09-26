package site.coduo.common.config.web.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import lombok.RequiredArgsConstructor;
import site.coduo.member.exception.AuthenticationException;
import site.coduo.member.infrastructure.security.JwtProvider;

@RequiredArgsConstructor
public class SignInCookieFilter implements Filter {

    public static final String SIGN_IN_COOKIE_NAME = "coduo_whoami";

    private final JwtProvider jwtProvider;

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
            throws IOException, ServletException {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        if (httpRequest.getMethod().equalsIgnoreCase("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }
        validate(parseSignInCookie(httpRequest));
        chain.doFilter(request, response);
    }

    private Cookie parseSignInCookie(final HttpServletRequest request) {
        final Cookie[] cookies = request.getCookies();
        if (Objects.isNull(cookies)) {
            throw new AuthenticationException("쿠키 값이 비어있습니다.");
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(SIGN_IN_COOKIE_NAME))
                .findAny()
                .orElseThrow(() -> new AuthenticationException("로그인 쿠키를 찾을 수 없습니다."));
    }

    private void validate(final Cookie cookie) {
        if (jwtProvider.isValid(cookie.getValue())) {
            return;
        }
        throw new AuthenticationException("로그인 쿠키 값이 유효하지 않습니다.");
    }
}
