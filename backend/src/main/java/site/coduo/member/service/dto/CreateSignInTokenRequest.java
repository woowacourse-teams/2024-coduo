package site.coduo.member.service.dto;

import org.apache.commons.lang3.StringUtils;

import site.coduo.member.exception.AuthenticationException;

public record CreateSignInTokenRequest(String accessToken) {

    public void validateCreateRequest() {
        if (StringUtils.isBlank(accessToken)) {
            throw new AuthenticationException("엑세스 토큰에 대한 세션정보가 없습니다.");
        }
    }
}
