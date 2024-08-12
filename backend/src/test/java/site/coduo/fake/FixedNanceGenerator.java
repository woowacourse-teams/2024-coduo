package site.coduo.fake;

import site.coduo.common.exception.AuthorizationException;
import site.coduo.member.infrastructure.security.NanceGenerator;

public class FixedNanceGenerator implements NanceGenerator {
    public static final String FIXED_VALUE = "random number";

    @Override
    public String generate() {
        return FIXED_VALUE;
    }

    @Override
    public void verify(final String origin, final String other) {
        if (origin.equals(other)) {
            return;
        }
        throw new AuthorizationException("테스트 인가 예외");
    }
}
