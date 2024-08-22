package site.coduo.common.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import site.coduo.common.config.filter.AccessTokenSessionFilter;
import site.coduo.common.config.filter.AuthFailHandlerFilter;
import site.coduo.common.config.filter.SignInCookieFilter;
import site.coduo.common.config.filter.StateSessionFilter;
import site.coduo.member.infrastructure.security.JwtProvider;

@RequiredArgsConstructor
@Configuration
public class FilterConfig {

    private final JwtProvider jwtProvider; //TODO 인스턴스 변수 없애고 사옹하는 메서드에서 파라미터로 받자.

    @Bean
    public FilterRegistrationBean<StateSessionFilter> stateSessionFilter() {
        final FilterRegistrationBean<StateSessionFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new StateSessionFilter());
        bean.addUrlPatterns("/api/github/callback");
        bean.setOrder(1);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<AccessTokenSessionFilter> accessTokenSessionFilter() {
        final FilterRegistrationBean<AccessTokenSessionFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new AccessTokenSessionFilter());
        bean.addUrlPatterns("/api/sign-up", "/api/sign-in/callback");
        bean.setOrder(2);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<SignInCookieFilter> signInCookieFilter() {
        final FilterRegistrationBean<SignInCookieFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new SignInCookieFilter(jwtProvider));
        bean.addUrlPatterns("/api/sign-out", "/api/sign-in/check", "/api/member");
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
