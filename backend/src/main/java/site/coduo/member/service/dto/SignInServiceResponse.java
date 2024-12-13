package site.coduo.member.service.dto;

public record SignInServiceResponse(boolean signedIn, String token) {

    public SignInServiceResponse(final boolean signedIn, final String token) {
        this.signedIn = signedIn;
        this.token = signedIn ? token : "";
    }
}

