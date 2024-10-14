package site.coduo.member.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.ResponseSpec.ErrorHandler;

import site.coduo.member.client.dto.TokenRequest;
import site.coduo.member.client.dto.TokenResponse;
import site.coduo.member.exception.ExternalApiCallException;
import site.coduo.member.infrastructure.http.Basic;

@Component
public class GithubOAuthClient {

    private static final int CONNECT_TIME_VALUE = 10000;
    private static final int READ_TIME_OUT_VALUE = 20000;

    private final RestClient client;

    @Value("${oauth.github.client-id}")
    private String oAuthClientId;

    @Value("${oauth.github.client-secret}")
    private String oAuthClientSecret;

    @Value("${oauth.github.redirect-uri}")
    private String oAuthRedirectUri;

    public GithubOAuthClient() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(CONNECT_TIME_VALUE);
        requestFactory.setReadTimeout(READ_TIME_OUT_VALUE);

        this.client = RestClient.builder()
                .requestFactory(requestFactory)
                .messageConverters(converter -> converter.add(new FormHttpMessageConverter()))
                .baseUrl("https://github.com/")
                .build();
    }

    public TokenResponse grant(final TokenRequest request) {

        return client.post()
                .uri("/login/oauth/access_token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .accept(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.AUTHORIZATION, new Basic(oAuthClientId, oAuthClientSecret).getValue())
                .body(request.toQueryParams())
                .retrieve()
                .onStatus(HttpStatusCode::isError, getErrorHandler())
                .body(TokenResponse.class);
    }

    public String getOAuthClientId() {
        return oAuthClientId;
    }

    public String getOAuthRedirectUri() {
        return oAuthRedirectUri;
    }

    private ErrorHandler getErrorHandler() {
        return (request, response) -> {
            if (response.getStatusCode().is4xxClientError()) {
                throw new ExternalApiCallException("Github OAuth API 호출에 실패했습니다.");
            }
            if (response.getStatusCode().is5xxServerError()) {
                throw new ExternalApiCallException("Github OAuth 과정 중 서버 내부에서 오류가 발생했습니다.");
            }
        };
    }
}
