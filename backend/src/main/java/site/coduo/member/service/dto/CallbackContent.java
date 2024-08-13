package site.coduo.member.service.dto;

import site.coduo.member.controller.dto.oauth.GithubCallbackQuery;
import site.coduo.member.exception.AuthenticationException;

public record CallbackContent(String code, String returnedState, String savedState) {

    public CallbackContent(final GithubCallbackQuery query, final String savedState) {
        this(query.code(), query.state(), savedState);
    }

    public void validateState() {
        if (!returnedState.equals(savedState)) {
            throw new AuthenticationException("state값이 올바르지 않습니다.");
        }
    }
}
