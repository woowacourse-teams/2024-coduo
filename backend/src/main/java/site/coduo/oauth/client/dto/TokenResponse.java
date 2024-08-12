package site.coduo.oauth.client.dto;

import site.coduo.common.infrastructure.http.Bearer;

public record TokenResponse(Bearer accessToken, String scope, String tokenType) {

    public String getCredential() {
        return accessToken.getCredential();
    }

}
