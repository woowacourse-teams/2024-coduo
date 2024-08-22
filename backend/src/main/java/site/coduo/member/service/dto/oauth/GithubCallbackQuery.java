package site.coduo.member.service.dto.oauth;

public record GithubCallbackQuery(String code, String state) {
}
