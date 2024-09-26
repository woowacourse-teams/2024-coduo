package site.coduo.common.config.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface SessionFilter extends Filter {

    default void template(HttpServletRequest request, HttpServletResponse response) {
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return;
        }
        final String storeSession = getStoreSession(request);
        validate(request, storeSession);
        removeSession(request, response);
    }

    String getStoreSession(HttpServletRequest request);

    void removeSession(HttpServletRequest request, HttpServletResponse response);

    void validate(HttpServletRequest request, String storeSession);
}
