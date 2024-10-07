package site.coduo.common.config.web;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import site.coduo.common.config.web.filter.AccessTokenCookieFilter;
import site.coduo.common.config.web.filter.AuthFailHandlerFilter;
import site.coduo.common.config.web.filter.SignInCookieFilter;
import site.coduo.member.infrastructure.security.JwtProvider;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<AccessTokenCookieFilter> accessTokenSessionFilter(final JwtProvider jwtProvider) {
        final FilterRegistrationBean<AccessTokenCookieFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new AccessTokenCookieFilter(jwtProvider));
        bean.addUrlPatterns("/api/sign-up", "/api/sign-in/callback");
        bean.setOrder(2);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<SignInCookieFilter> signInCookieFilter(final JwtProvider jwtProvider) {
        final FilterRegistrationBean<SignInCookieFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new SignInCookieFilter(jwtProvider));
        bean.addUrlPatterns("/api/sign-out", "/api/member");
        bean.setOrder(1);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<AuthFailHandlerFilter> authFailHandlerFilter(final ObjectMapper objectMapper) {
        final FilterRegistrationBean<AuthFailHandlerFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new AuthFailHandlerFilter(objectMapper));
        bean.setOrder(0);
        return bean;
    }
}
