package site.coduo.oauth.client.dto;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public record TokenRequest(String code, String redirectUri) {

    public MultiValueMap<String, String> toQueryParams() {
        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("redirect_uri", redirectUri);
        return params;
    }
}
