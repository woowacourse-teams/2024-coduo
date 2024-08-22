package site.coduo.member.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TokenResponse(@JsonProperty(value = "access_token") String accessToken,
                            @JsonProperty(value = "scope") String scope,
                            @JsonProperty(value = "token_type") String tokenType
) {
}
