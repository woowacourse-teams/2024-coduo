package site.coduo.common.config.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface SessionFilter extends Filter {

    default void template(HttpServletRequest request, HttpServletResponse response, String sessionName) {
        final String storeSession = getStoreSession(request, sessionName);
        final String requestSession = getRequestSession(request, sessionName);
        validate(storeSession, requestSession);
        removeSession(request, response, sessionName);
    }

    String getStoreSession(HttpServletRequest request, String sessionName);

    String getRequestSession(HttpServletRequest request, String sessionName);

    void removeSession(HttpServletRequest request, HttpServletResponse response, String sessionName);

    void validate(String storeSession, String requestSession);
}
