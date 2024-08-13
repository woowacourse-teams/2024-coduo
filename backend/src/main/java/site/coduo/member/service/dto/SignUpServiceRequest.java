package site.coduo.member.service.dto;

import org.apache.commons.lang3.StringUtils;

import site.coduo.member.exception.AuthenticationException;
import site.coduo.member.infrastructure.http.Bearer;

public record SignUpServiceRequest(Bearer bearer, String username) {

    public void validateEmptyCredential() {
        if (StringUtils.isBlank(bearer.getCredential())) {
            throw new AuthenticationException("세션 정보가 올바르지 않습니다.");
        }
    }
}
