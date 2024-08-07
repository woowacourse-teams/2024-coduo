package site.coduo.oauth.client.dto;

public record TokenResponse(String accessToken, String scope, String tokenType) {
}
