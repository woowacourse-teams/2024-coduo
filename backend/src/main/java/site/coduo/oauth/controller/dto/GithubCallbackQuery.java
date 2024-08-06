package site.coduo.oauth.controller.dto;

public record GithubCallbackQuery(String code, String state) {
}
