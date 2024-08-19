package site.coduo.member.service.dto.oauth;

import site.coduo.member.exception.AuthenticationException;

public record State(String value) {

    public void validate(State other) {
        if (!(value.equals(other.value))) {
            throw new AuthenticationException("state값 불일치!");
        }
    }
}
