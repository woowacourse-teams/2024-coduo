package site.coduo.oauth.controller;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SessionConstant {

    public static final String STATE_SESSION_KEY = "state";
    public static final int STATE_SESSION_EXPIRE_IN = 30;
    public static final String ACCESS_TOKEN_KEY = "Access token";
    public static final int ACCESS_TOKEN_EXPIRE_IN = 300;
}
