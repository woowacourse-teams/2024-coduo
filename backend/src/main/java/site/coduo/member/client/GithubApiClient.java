package site.coduo.member.client;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.ResponseSpec.ErrorHandler;

import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.exception.ExternalApiCallException;

@Slf4j
@Component
public class GithubApiClient {

    private static final int CONNECT_TIME_VALUE = 1000;
    private static final int READ_TIME_OUT_VALUE = 10000;

    private final RestClient client;

    public GithubApiClient() {
        final SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(CONNECT_TIME_VALUE);
        requestFactory.setReadTimeout(READ_TIME_OUT_VALUE);

        this.client = RestClient.builder()
                .requestFactory(requestFactory)
                .messageConverters(converter -> converter.add(new MappingJackson2HttpMessageConverter()))
                .baseUrl("https://api.github.com/")
                .build();
    }

    GithubApiClient(final RestClient restClient) {
        this.client = restClient;
    }

    public GithubUserResponse getUser(final GithubUserRequest request) {

        return client.get()
                .uri("/user")
                .accept()
                .headers(httpHeaders -> httpHeaders.addAll(request.getHeaders()))
                .retrieve()
                .onStatus(HttpStatusCode::isError, getErrorHandler())
                .body(GithubUserResponse.class);
    }

    private ErrorHandler getErrorHandler() {
        return (request, response) -> {
            if (response.getStatusCode().is4xxClientError()) {
                throw new ExternalApiCallException("Github API 호출에 실패했습니다.");
            }
            if (response.getStatusCode().is5xxServerError()) {
                throw new ExternalApiCallException("Github API 호출 과정 중 서버 내부에서 오류가 발생했습니다.");
            }
        };
    }
}
