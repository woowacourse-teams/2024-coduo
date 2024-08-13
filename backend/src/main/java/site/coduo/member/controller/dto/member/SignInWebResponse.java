package site.coduo.member.controller.dto.member;

import site.coduo.member.service.dto.SignInServiceResponse;

public record SignInWebResponse(boolean signedUp) {

    public static SignInWebResponse of(SignInServiceResponse response) {
        return new SignInWebResponse(response.singedUp());
    }
}
