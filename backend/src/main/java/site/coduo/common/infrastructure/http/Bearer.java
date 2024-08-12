package site.coduo.common.infrastructure.http;

import lombok.Getter;

@Getter
public class Bearer {

    public static final String SCHEME = "BEARER";

    private final String value;

    public Bearer(String credential) {
        this.value = SCHEME + " " + credential;
    }

    public String getCredential() {
        return value.split(" ")[1];
    }
}
