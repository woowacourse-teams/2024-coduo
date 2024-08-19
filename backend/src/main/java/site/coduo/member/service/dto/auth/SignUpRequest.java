package site.coduo.member.service.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원등록")
public record SignUpRequest(@Schema(description = "회원 등록 이름", example = "true") String username) {
}
