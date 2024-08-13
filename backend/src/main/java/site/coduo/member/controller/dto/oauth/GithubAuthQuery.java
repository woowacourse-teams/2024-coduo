package site.coduo.member.controller.dto.oauth;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


public record GithubAuthQuery(String clientId, String redirectUri, String state) {

    public MultiValueMap<String, String> toQueryParams() {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("state", state);
        params.add("redirect_uri", redirectUri);

        return params;
    }
}
