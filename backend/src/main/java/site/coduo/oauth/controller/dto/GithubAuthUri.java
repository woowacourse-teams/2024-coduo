package site.coduo.oauth.controller.dto;

import java.net.URI;

import org.springframework.web.util.UriComponentsBuilder;

public record GithubAuthUri(GithubAuthQuery query) {

    public URI toUri() {
        return UriComponentsBuilder.fromHttpUrl(query.redirectUri())
                .queryParams(query.toQueryParams())
                .build()
                .toUri();
    }
}
