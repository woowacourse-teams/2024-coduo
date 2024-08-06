package site.coduo.oauth.controller.dto;

import java.time.LocalDateTime;

public record StateSession(String nonce, LocalDateTime issuedAt) {

    public static final int SESSION_EXPIRE_MIN = 30;
    public static final String SESSION_NAME = "state";
}
