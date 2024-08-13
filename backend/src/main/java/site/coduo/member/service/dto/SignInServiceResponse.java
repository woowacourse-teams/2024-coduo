package site.coduo.member.service.dto;

public record SignInServiceResponse(boolean singedUp, String token) {

    public SignInServiceResponse(final boolean singedUp, final String token) {
        this.singedUp = singedUp;
        this.token = singedUp ? token : "";
    }
}
