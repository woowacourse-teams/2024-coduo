package site.coduo.fake;

import site.coduo.oauth.security.NanceFactory;

public class FixedNanceFactory implements NanceFactory {
    public static final String FIXED_VALUE = "random number";

    @Override
    public String generate() {
        return FIXED_VALUE;
    }
}
