package site.coduo.member.service.dto;

import site.coduo.common.infrastructure.security.Bearer;

public record MemberOAuthCreateRequest(Bearer bearer, String username) {

}
