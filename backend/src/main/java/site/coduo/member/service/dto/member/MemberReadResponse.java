package site.coduo.member.service.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 정보")
public record MemberReadResponse(@Schema(description = "회원 등록 이름", example = "fram98") String username) {
}
