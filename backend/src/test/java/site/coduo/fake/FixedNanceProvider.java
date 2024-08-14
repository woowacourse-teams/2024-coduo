package site.coduo.fake;

import site.coduo.member.infrastructure.security.NanceProvider;

public class FixedNanceProvider implements NanceProvider {
    public static final String FIXED_VALUE = "random number";

    @Override
    public String generate() {
        return FIXED_VALUE;
    }
}
