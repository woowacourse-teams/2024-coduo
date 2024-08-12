package site.coduo.oauth.service.dto;

import site.coduo.oauth.controller.dto.GithubCallbackQuery;

public record CallbackContent(String code, String returnedState, String savedState) {

    public static CallbackContent from(GithubCallbackQuery query, String savedState) {
        return new CallbackContent(query.code(), query.state(), savedState);
    }
}
