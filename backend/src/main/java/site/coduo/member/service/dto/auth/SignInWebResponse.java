package site.coduo.member.service.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import site.coduo.member.service.dto.SignInServiceResponse;

@Schema(description = "회원등록 여부 확인")
public record SignInWebResponse(@Schema(description = "회원 등록 여부", example = "true") boolean signedUp) {

    public static SignInWebResponse of(final SignInServiceResponse response) {
        return new SignInWebResponse(response.signedIn());
    }
}
