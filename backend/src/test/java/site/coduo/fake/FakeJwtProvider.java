package site.coduo.fake;

import site.coduo.member.infrastructure.security.JwtProvider;

public class FakeJwtProvider extends JwtProvider {
    public static final String MEMBER_SUBJECT = "123";

    @Override
    public boolean isValid(final String token) {
        return !token.isBlank();
    }

    @Override
    public String extractSubject(final String token) {
        return MEMBER_SUBJECT;
    }
}
