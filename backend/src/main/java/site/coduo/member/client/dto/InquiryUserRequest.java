package site.coduo.member.client.dto;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import site.coduo.common.infrastructure.security.Bearer;

public record InquiryUserRequest(Bearer accessToken) {

    public MultiValueMap<String, String> getHeaders() {
        LinkedMultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("X-GitHub-Api-Version", "2022-11-28");
        headers.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.add(HttpHeaders.AUTHORIZATION, accessToken().getValue());

        return headers;
    }
}
