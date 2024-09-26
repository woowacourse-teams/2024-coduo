package site.coduo.member.service.dto.oauth;

import io.swagger.v3.oas.annotations.media.Schema;

public record GithubOAuthEndpoint(
        @Schema(description = "Github 인가 드포인트", example = "https://www.github.com/login/oauth/authorize?client_id=test&state=random%20number&redirect_uri=http://test.test") String endpoint) {
}
