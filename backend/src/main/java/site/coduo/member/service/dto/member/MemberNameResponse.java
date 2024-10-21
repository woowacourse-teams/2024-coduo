package site.coduo.member.service.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "회원 가입 여부 확인")
public record MemberNameResponse(@Schema(description = "회원 이름", example = "dle234") String memberName) {
}
