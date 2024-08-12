package site.coduo.member.infrastructure.security;

import java.util.UUID;

import org.springframework.stereotype.Component;

import site.coduo.common.exception.AuthorizationException;

@Component
public class UUIDNanceGenerator implements NanceGenerator {

    @Override
    public String generate() {
        return UUID.randomUUID().toString();
    }

    @Override
    public void verify(final String origin, final String other) {
        if (origin.equals(other)) {
            return;
        }
        throw new AuthorizationException("state 값이 올바르지 않습니다.");
    }
}
