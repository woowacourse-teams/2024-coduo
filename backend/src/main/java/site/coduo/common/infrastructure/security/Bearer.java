package site.coduo.common.infrastructure.security;

import lombok.Getter;

@Getter
public class Bearer {

    private static final String SCHEME = "BEARER";

    private final String value;

    public Bearer(String credential) {
        this.value = SCHEME + " " + credential;
    }
}
