package site.coduo.member.controller.dto.member;

import site.coduo.member.infrastructure.http.Bearer;
import site.coduo.member.service.dto.SignUpServiceRequest;

public record SignUpWebRequest(String username) {

    public SignUpServiceRequest toServiceRequest(final String credential) {
        return new SignUpServiceRequest(new Bearer(credential), username);
    }
}
