package site.coduo.fake;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.nio.charset.Charset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Stream;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage.Body;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInitializer;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.observation.ClientRequestObservationConvention;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.mock.http.client.MockClientHttpRequest;
import org.springframework.mock.http.client.MockClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClient.ResponseSpec.ErrorHandler;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import io.micrometer.observation.ObservationRegistry;
import site.coduo.member.client.dto.GithubUserResponse;

public class FakeClient implements RestClient {

    @Override
    public RequestHeadersUriSpec<?> get() {
        return new FakeRequestHeaderUriSpec();
    }

    @Override
    public RequestHeadersUriSpec<?> head() {
        return new FakeRequestHeaderUriSpec();
    }

    @Override
    public RequestBodyUriSpec post() {
        return new FakeRequestBodyBodyUriSpec();
    }

    @Override
    public RequestBodyUriSpec put() {
        return new FakeRequestBodyBodyUriSpec();
    }

    @Override
    public RequestBodyUriSpec patch() {
        return new FakeRequestBodyBodyUriSpec();
    }

    @Override
    public RequestHeadersUriSpec<?> delete() {
        return new FakeRequestHeaderUriSpec();
    }

    @Override
    public RequestHeadersUriSpec<?> options() {
        return new FakeRequestHeaderUriSpec();
    }

    @Override
    public RequestBodyUriSpec method(final HttpMethod method) {
        return new FakeRequestBodyBodyUriSpec();
    }

    @Override
    public Builder mutate() {
        return new FakeBuilder();
    }


    class FakeBuilder implements Builder {

        @Override
        public Builder baseUrl(final String baseUrl) {
            return this;
        }

        @Override
        public Builder defaultUriVariables(final Map<String, ?> defaultUriVariables) {
            return this;
        }

        @Override
        public Builder uriBuilderFactory(final UriBuilderFactory uriBuilderFactory) {
            return this;
        }

        @Override
        public Builder defaultHeader(final String header, final String... values) {
            return this;
        }

        @Override
        public Builder defaultHeaders(final Consumer<HttpHeaders> headersConsumer) {
            return this;
        }

        @Override
        public Builder defaultRequest(final Consumer<RequestHeadersSpec<?>> defaultRequest) {
            return this;
        }

        @Override
        public Builder defaultStatusHandler(final Predicate<HttpStatusCode> statusPredicate,
                                            final ErrorHandler errorHandler) {
            return this;
        }

        @Override
        public Builder defaultStatusHandler(final ResponseErrorHandler errorHandler) {
            return this;
        }

        @Override
        public Builder requestInterceptor(final ClientHttpRequestInterceptor interceptor) {
            return this;
        }

        @Override
        public Builder requestInterceptors(final Consumer<List<ClientHttpRequestInterceptor>> interceptorsConsumer) {
            return this;
        }

        @Override
        public Builder requestInitializer(final ClientHttpRequestInitializer initializer) {
            return this;
        }

        @Override
        public Builder requestInitializers(final Consumer<List<ClientHttpRequestInitializer>> initializersConsumer) {
            return this;
        }

        @Override
        public Builder requestFactory(final ClientHttpRequestFactory requestFactory) {
            return this;
        }

        @Override
        public Builder messageConverters(final Consumer<List<HttpMessageConverter<?>>> configurer) {
            return this;
        }

        @Override
        public Builder observationRegistry(final ObservationRegistry observationRegistry) {
            return this;
        }

        @Override
        public Builder observationConvention(final ClientRequestObservationConvention observationConvention) {
            return this;
        }

        @Override
        public Builder apply(final Consumer<Builder> builderConsumer) {
            return this;
        }

        @Override
        public Builder clone() {
            return this;
        }

        @Override
        public RestClient build() {
            return new FakeClient();
        }
    }

    class FakeResponseSpec implements ResponseSpec {

        private final HttpRequest request;
        private final ClientHttpResponse response;
        private final HttpStatus httpStatus;

        public FakeResponseSpec(final HttpStatus httpStatus, final HttpMethod method, final URI url) {
            this.httpStatus = httpStatus;
            this.request = new MockClientHttpRequest(method, url);
            this.response = new MockClientHttpResponse(new byte[]{}, httpStatus.value());
        }

        @Override
        public ResponseSpec onStatus(final Predicate<HttpStatusCode> statusPredicate, final ErrorHandler errorHandler) {
            final boolean error = statusPredicate.test(httpStatus);
            if (error) {
                try {
                    errorHandler.handle(request, response);
                } catch (final IOException e) {
                    throw new RuntimeException(e);
                }
            }
            return this;
        }

        @Override
        public ResponseSpec onStatus(final ResponseErrorHandler errorHandler) {
            try {
                errorHandler.handleError(response);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return this;
        }

        @Override
        public <T> T body(final Class<T> bodyType) {
            if (bodyType.isInstance(new GithubUserResponse("", "", ""))) {
                try {
                    return bodyType.getDeclaredConstructor(String.class, String.class, String.class)
                            .newInstance("userId", "login", "avatar_url");
                } catch (final NoSuchMethodException | InstantiationException | IllegalAccessException |
                               InvocationTargetException e) {
                    throw new RuntimeException(e);
                }
            }
            return null;
        }

        @Override
        public <T> T body(final ParameterizedTypeReference<T> bodyType) {
            return null;
        }

        @Override
        public <T> ResponseEntity<T> toEntity(final Class<T> bodyType) {
            return null;
        }

        @Override
        public <T> ResponseEntity<T> toEntity(final ParameterizedTypeReference<T> bodyType) {
            return null;
        }

        @Override
        public ResponseEntity<Void> toBodilessEntity() {
            return null;
        }
    }

    class FakeRequestHeaderUriSpec implements RequestHeadersUriSpec {

        private final HttpHeaders headers = new HttpHeaders();
        private String endPoint;

        @Override
        public RequestHeadersSpec accept(final MediaType... acceptableMediaTypes) {
            Stream.of(acceptableMediaTypes)
                    .forEach(value -> headers.add(HttpHeaders.ACCEPT, value.toString()));

            return this;
        }

        @Override
        public RequestHeadersSpec acceptCharset(final Charset... acceptableCharsets) {
            Stream.of(acceptableCharsets)
                    .forEach(value -> headers.add(HttpHeaders.ACCEPT_CHARSET, value.displayName()));

            return this;
        }

        @Override
        public RequestHeadersSpec ifModifiedSince(final ZonedDateTime ifModifiedSince) {
            headers.add(HttpHeaders.IF_MODIFIED_SINCE, ifModifiedSince.toString());
            return this;
        }

        @Override
        public RequestHeadersSpec ifNoneMatch(final String... ifNoneMatches) {
            Stream.of(ifNoneMatches)
                    .forEach(value -> headers.add(HttpHeaders.IF_NONE_MATCH, value));
            return this;
        }

        @Override
        public RequestHeadersSpec header(final String headerName, final String... headerValues) {
            Stream.of(headerValues)
                    .forEach(value -> headers.add(headerName, value));
            return this;
        }

        @Override
        public RequestHeadersSpec headers(final Consumer consumer) {
            consumer.accept(headers);
            return this;
        }

        @Override
        public RequestHeadersSpec httpRequest(final Consumer consumer) {
            return this;
        }

        @Override
        public ResponseSpec retrieve() {
            if (endPoint.equals("/user")) {
                final String token = headers.get(HttpHeaders.AUTHORIZATION).get(0).substring(7);
                if (token.isBlank()) {
                    return new FakeResponseSpec(HttpStatus.INTERNAL_SERVER_ERROR, HttpMethod.GET, URI.create("/user"));
                }
                return new FakeResponseSpec(HttpStatus.OK, HttpMethod.GET, URI.create("/user"));
            }
            return null;
        }

        @Override
        public Object exchange(final ExchangeFunction exchangeFunction, final boolean close) {
            return null;
        }

        @Override
        public RequestHeadersSpec<?> uri(final URI uri) {
            endPoint = uri.toString();
            return this;
        }

        @Override
        public RequestHeadersSpec<?> uri(final String uri, final Object... uriVariables) {
            endPoint = uri;
            return this;
        }

        @Override
        public RequestHeadersSpec<?> uri(final String uri, final Map uriVariables) {
            endPoint = uri;
            return this;
        }

        @Override
        public RequestHeadersSpec<?> uri(final String uri, final Function function) {
            endPoint = uri;
            return this;
        }

        @Override
        public RequestHeadersSpec<?> uri(final Function function) {
            return this;
        }
    }

    class FakeRequestBodyBodyUriSpec implements RequestBodyUriSpec {

        @Override
        public RequestBodySpec contentLength(final long contentLength) {
            return this;
        }

        @Override
        public RequestBodySpec contentType(final MediaType contentType) {
            return this;
        }

        @Override
        public RequestBodySpec body(final Object body) {
            return this;
        }

        @Override
        public <T> RequestBodySpec body(final T body, final ParameterizedTypeReference<T> bodyType) {
            return this;
        }

        @Override
        public RequestBodySpec body(final Body body) {
            return this;
        }

        @Override
        public RequestBodySpec accept(final MediaType... acceptableMediaTypes) {
            return this;
        }

        @Override
        public RequestBodySpec acceptCharset(final Charset... acceptableCharsets) {
            return this;
        }

        @Override
        public RequestBodySpec ifModifiedSince(final ZonedDateTime ifModifiedSince) {
            return this;
        }

        @Override
        public RequestBodySpec ifNoneMatch(final String... ifNoneMatches) {
            return this;
        }

        @Override
        public RequestBodySpec header(final String headerName, final String... headerValues) {
            return this;
        }

        @Override
        public RequestBodySpec headers(final Consumer<HttpHeaders> headersConsumer) {
            return this;
        }

        @Override
        public RequestBodySpec httpRequest(final Consumer<ClientHttpRequest> requestConsumer) {
            return this;
        }

        @Override
        public ResponseSpec retrieve() {
            return null;
        }

        @Override
        public <T> T exchange(final ExchangeFunction<T> exchangeFunction, final boolean close) {
            return null;
        }

        @Override
        public RequestBodySpec uri(final URI uri) {
            return this;
        }

        @Override
        public RequestBodySpec uri(final String uri, final Object... uriVariables) {
            return this;
        }

        @Override
        public RequestBodySpec uri(final String uri, final Map<String, ?> uriVariables) {
            return this;
        }

        @Override
        public RequestBodySpec uri(final String uri, final Function<UriBuilder, URI> uriFunction) {
            return this;
        }

        @Override
        public RequestBodySpec uri(final Function<UriBuilder, URI> uriFunction) {
            return this;
        }
    }

}
