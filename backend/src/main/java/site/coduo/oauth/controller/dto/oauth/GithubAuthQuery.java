package site.coduo.oauth.controller.dto.oauth;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import site.coduo.oauth.service.dto.OAuthTriggerContent;

public record GithubAuthQuery(String clientId, String redirectUri, String state) {

    public static GithubAuthQuery of(OAuthTriggerContent response) {
        return new GithubAuthQuery(response.clientId(), response.redirectUri(), response.state());
    }

    public MultiValueMap<String, String> toQueryParams() {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("state", state);
        params.add("redirect_uri", redirectUri);

        return params;
    }
}
