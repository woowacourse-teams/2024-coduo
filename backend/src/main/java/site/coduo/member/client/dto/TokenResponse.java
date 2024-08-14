package site.coduo.member.client.dto;

import site.coduo.member.infrastructure.http.Bearer;

public record TokenResponse(Bearer accessToken, String scope, String tokenType) {

    public String getCredential() {
        return accessToken.getCredential();
    }

}
