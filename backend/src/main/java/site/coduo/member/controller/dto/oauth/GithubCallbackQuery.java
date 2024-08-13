package site.coduo.member.controller.dto.oauth;

public record GithubCallbackQuery(String code, String state) {
}
