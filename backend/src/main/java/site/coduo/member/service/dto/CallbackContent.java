package site.coduo.member.service.dto;

import site.coduo.member.controller.dto.oauth.GithubCallbackQuery;

public record CallbackContent(String code, String returnedState, String savedState) {

    public static CallbackContent from(final GithubCallbackQuery query, final String savedState) {
        return new CallbackContent(query.code(), query.state(), savedState);
    }
}
