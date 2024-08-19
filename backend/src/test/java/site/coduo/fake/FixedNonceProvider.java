package site.coduo.fake;

import site.coduo.member.infrastructure.security.NonceProvider;

public class FixedNonceProvider implements NonceProvider {
    public static final String FIXED_VALUE = "random number";

    @Override
    public String generate() {
        return FIXED_VALUE;
    }
}
