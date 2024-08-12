package site.coduo.member.service.dto;

import site.coduo.common.infrastructure.http.Bearer;

public record MemberCreateServiceRequest(Bearer bearer, String username) {

}
