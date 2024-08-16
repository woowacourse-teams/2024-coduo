package site.coduo.fake;

import site.coduo.member.infrastructure.security.JwtProvider;

public class FakeJwtProvider extends JwtProvider {
    @Override
    public boolean isValid(final String token) {
        return !token.isBlank();
    }
}
