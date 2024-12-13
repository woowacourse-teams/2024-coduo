package site.coduo.member.service.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 여부 확인")
public record SignInCheckResponse(@Schema(description = "로그인 여부", example = "true") boolean signedIn) {
}
