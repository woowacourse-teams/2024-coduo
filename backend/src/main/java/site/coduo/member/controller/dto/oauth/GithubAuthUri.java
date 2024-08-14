package site.coduo.member.controller.dto.oauth;

import java.net.URI;

import org.springframework.web.util.UriComponentsBuilder;

public record GithubAuthUri(GithubAuthQuery query) {
    private static final String GITHUB_AUTH_END_POINT = "https://www.github.com/login/oauth/authorize";

    public String toPlainText() {
        return toUri().toString();
    }

    private URI toUri() {
        return UriComponentsBuilder.fromHttpUrl(GITHUB_AUTH_END_POINT)
                .queryParams(query.toQueryParams())
                .build()
                .toUri();
    }
}
