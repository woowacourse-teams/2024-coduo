package site.coduo.common.config.filter;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.common.controller.response.ApiErrorResponse;
import site.coduo.member.controller.error.MemberApiError;
import site.coduo.member.exception.AuthenticationException;

@Slf4j
@RequiredArgsConstructor
public class AuthFailHandlerFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (final AuthenticationException e) {
            log.warn(e.getMessage());

            response.setStatus(MemberApiError.AUTHENTICATION_ERROR.getHttpStatus().value());
            response.setContentType("application/json;charset=utf-8");
            response.getWriter()
                    .write(objectMapper.writeValueAsString(
                            new ApiErrorResponse(MemberApiError.AUTHENTICATION_ERROR.getMessage())));
        }
    }
}
