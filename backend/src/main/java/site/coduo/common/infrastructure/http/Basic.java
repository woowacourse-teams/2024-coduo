package site.coduo.common.infrastructure.http;

import java.nio.charset.StandardCharsets;

import org.springframework.http.HttpHeaders;

import lombok.Getter;

@Getter
public class Basic {

    private static final String SCHEME = "BASIC";
    private final String value;

    public Basic(final String identifier, final String password) {
        final String credentials = HttpHeaders.encodeBasicAuth(identifier, password, StandardCharsets.UTF_8);
        this.value = SCHEME + " " + credentials;
    }
}
