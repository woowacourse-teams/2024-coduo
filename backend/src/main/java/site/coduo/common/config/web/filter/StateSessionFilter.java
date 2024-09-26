package site.coduo.common.config.web.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;
import site.coduo.member.exception.AuthenticationException;
import site.coduo.member.service.dto.oauth.State;

@Slf4j
public class StateSessionFilter implements SessionFilter {

    public static final String STATE_SESSION_NAME = "state";
    public static final int STATE_SESSION_EXPIRE_IN_SECOND = 30;

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
            throws ServletException, IOException {
        template((HttpServletRequest) request, (HttpServletResponse) response);
        chain.doFilter(request, response);
    }

    @Override
    public String getStoreSession(final HttpServletRequest request) {
        final HttpSession session = request.getSession();
        final String sessionState = (String) session.getAttribute(STATE_SESSION_NAME);
        if (Objects.isNull(sessionState)) {
            throw new AuthenticationException("세션에서 state 정보를 찾을 수 없습니다.");
        }
        return sessionState;
    }

    @Override
    public void removeSession(final HttpServletRequest request, final HttpServletResponse response) {
        final HttpSession session = request.getSession();
        session.removeAttribute(STATE_SESSION_NAME);
    }

    @Override
    public void validate(final HttpServletRequest request, final String storeSession) {
        final State storedState = new State(storeSession);
        final State requestedState = new State(getRequestSession(request));
        storedState.validate(requestedState);
    }

    private String getRequestSession(final HttpServletRequest request) {
        final String query = request.getQueryString();

        return Arrays.stream(query.split("&"))
                .filter(queryKey -> queryKey.startsWith(STATE_SESSION_NAME))
                .map(stateQuery -> stateQuery.split("=")[1])
                .findAny()
                .orElseThrow(() -> new AuthenticationException("Http 요청 Query String에서 state를 찾을 수 없습니다."));
    }
}
