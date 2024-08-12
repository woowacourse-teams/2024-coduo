package site.coduo.member.service.dto;

import site.coduo.common.infrastructure.http.Bearer;

public record MemberOAuthCreateRequest(Bearer bearer, String username) {

}
