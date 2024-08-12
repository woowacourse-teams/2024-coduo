package site.coduo.member.service.dto;

import lombok.Builder;

@Builder
public record OAuthTriggerContent(String clientId, String redirectUri, String scope, String state) {
}
