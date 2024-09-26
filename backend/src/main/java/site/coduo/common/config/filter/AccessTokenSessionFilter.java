package site.coduo.common.config.filter;

import java.io.IOException;
import java.util.Objects;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpHeaders;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.exception.AuthenticationException;

@Slf4j
@RequiredArgsConstructor
public class AccessTokenSessionFilter implements SessionFilter {

    public static final String ACCESS_TOKEN_SESSION_NAME = "access token";
    public static final int ACCESS_TOKEN_EXPIRE_IN_SECOND = 600;

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
            throws IOException, ServletException {
        template((HttpServletRequest) request, (HttpServletResponse) response);
        chain.doFilter(request, response);
    }

    @Override
    public String getStoreSession(final HttpServletRequest request) {
        final HttpSession session = request.getSession();
        final String sessionState = (String) session.getAttribute(ACCESS_TOKEN_SESSION_NAME);
        if (Objects.isNull(sessionState)) {
            throw new AuthenticationException("세션에서 Access token의 정보를 찾을 수 없습니다.");
        }
        return sessionState;
    }

    @Override
    public void removeSession(final HttpServletRequest request, final HttpServletResponse response) {
        final String setCookie = response.getHeader(HttpHeaders.SET_COOKIE);
        final HttpSession session = request.getSession();
        if (hasSignInCookie(setCookie)) {
            session.invalidate();
        }
    }

    private boolean hasSignInCookie(final String setCookie) {
        return !Objects.isNull(setCookie) && !setCookie.isBlank() && setCookie.startsWith(
                SignInCookieFilter.SIGN_IN_COOKIE_NAME);
    }

    @Override
    public void validate(final HttpServletRequest request, final String storeSession) {
        if (storeSession.isBlank()) {
            throw new AuthenticationException("세션의 Access token이 비어있습니다.");
        }
    }
}
