package site.coduo.oauth.controller.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import site.coduo.oauth.service.dto.OAuthTriggerContent;

public record GithubAuthQuery(String clientId, String redirectUri, String state) {

    public static GithubAuthQuery of(OAuthTriggerContent response) {
        return new GithubAuthQuery(response.clientId(), response.redirectUri(), response.state());
    }

    public MultiValueMap<String, String> toQueryParams() {
        LinkedMultiValueMap<String, String> queries = new LinkedMultiValueMap<>();
        queries.add("client_id", clientId);
        queries.add("state", state);
        queries.add("redirect_uri", redirectUri);

        return queries;
    }
}
