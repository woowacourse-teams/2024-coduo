package site.coduo.member.infrastructure.http;

import lombok.Getter;

@Getter
public class Bearer {

    public static final String SCHEME = "BEARER";

    private final String value;

    public Bearer(final String credential) {
        this.value = SCHEME + " " + credential;
    }

    public String getCredential() {
        return value.split(" ")[1];
    }
}
