package site.coduo.oauth.client;

import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import site.coduo.oauth.client.dto.GithubUserRequest;
import site.coduo.oauth.client.dto.GithubUserResponse;

@Component
public class GithubApiClient {

    private static final int CONNECT_TIME_VALUE = 1000;
    private static final int READ_TIME_OUT_VALUE = 10000;

    private final RestClient client;

    public GithubApiClient() {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(CONNECT_TIME_VALUE);
        requestFactory.setReadTimeout(READ_TIME_OUT_VALUE);

        this.client = RestClient.builder()
                .requestFactory(requestFactory)
                .messageConverters(converter -> converter.add(new MappingJackson2HttpMessageConverter()))
                .baseUrl("https://api.github.com/")
                .build();
    }

    public GithubUserResponse getUser(GithubUserRequest request) {

        return client.get()
                .uri("/user")
                .accept()
                .headers(httpHeaders -> httpHeaders.addAll(request.getHeaders()))
                .retrieve()
                .body(GithubUserResponse.class);
    }
}
