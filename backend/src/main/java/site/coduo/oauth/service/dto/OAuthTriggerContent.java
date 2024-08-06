package site.coduo.oauth.service.dto;

import lombok.Builder;

@Builder
public record OAuthTriggerContent(String clientId, String redirectUri, String scope, String state) {
}
