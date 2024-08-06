package site.coduo.oauth.infrastructure.security;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CsrfConstant {

    public static final String STATE_SESSION_KEY = "state";
    public static final int SESSION_EXPIRE_IN = 30;
}
