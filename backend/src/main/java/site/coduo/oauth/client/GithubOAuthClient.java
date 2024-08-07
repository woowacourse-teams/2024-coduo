package site.coduo.oauth.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import site.coduo.common.infrastructure.security.Basic;
import site.coduo.oauth.client.dto.TokenRequest;
import site.coduo.oauth.client.dto.TokenResponse;

@Component
public class GithubOAuthClient implements OAuthClient {

    private static final int CONNECT_TIME_VALUE = 1000;
    private static final int READ_TIME_OUT_VALUE = 10000;

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

    @Override
    public TokenResponse grant(TokenRequest request) {

        String body = client.post()
                .uri("/login/oauth/access_token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .header(HttpHeaders.AUTHORIZATION, new Basic(oAuthClientId, oAuthClientSecret).getValue())
                .body(request.toQueryParams())
                .retrieve()
                .body(String.class);
        return new TokenResponse(body, "scope", "tokenType");
    }

    @Override
    public String getOAuthClientId() {
        return oAuthClientId;
    }

    @Override
    public String getOAuthRedirectUri() {
        return oAuthRedirectUri;
    }
}
