package site.coduo.oauth.controller.dto.member;

import site.coduo.common.infrastructure.http.Bearer;
import site.coduo.oauth.service.dto.MemberCreateServiceRequest;

public record MemberCreateWebRequest(String username) {

    public MemberCreateServiceRequest toServiceRequest(final String credential) {
        return new MemberCreateServiceRequest(new Bearer(credential), username);
    }
}
