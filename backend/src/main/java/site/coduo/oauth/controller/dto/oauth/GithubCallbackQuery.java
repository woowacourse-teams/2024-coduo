package site.coduo.oauth.controller.dto.oauth;

public record GithubCallbackQuery(String code, String state) {
}
