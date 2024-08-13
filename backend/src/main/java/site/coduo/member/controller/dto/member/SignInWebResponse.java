package site.coduo.member.controller.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.member.service.dto.SignInServiceResponse;

@Schema(description = "회원가입 요청")
public record SignInWebResponse(@Schema(description = "회원 등록 여부", example = "true") boolean signedUp) {

    public static SignInWebResponse of(final SignInServiceResponse response) {
        return new SignInWebResponse(response.signedIn());
    }
}
