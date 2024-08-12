package site.coduo.oauth.service.dto;

public record CallbackContent(String code, String returnedState, String savedState) {
}
