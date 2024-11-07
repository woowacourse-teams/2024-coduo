package site.coduo.member.support;

import site.coduo.member.domain.Member;

public abstract class MemberDummy {

    public static Member createDummy() {
        return Member.builder()
                .providerUserId("userId")
                .providerAccessToken("access")
                .providerLoginId("loginId")
                .username("username")
                .build();
    }

    public static Member createDummy(final String userId) {
        return Member.builder()
                .providerUserId(userId)
                .providerAccessToken("access")
                .providerLoginId("loginId")
                .username("username")
                .build();
    }

    public static Member createDummy(final String username, final String accessToken, final String userId) {
        return Member.builder()
                .providerUserId(userId)
                .providerAccessToken(accessToken)
                .username(username)
                .providerLoginId("")
                .build();
    }

    public static Member createDummy(final String username, final String accessToken, final String userId, final String loginId) {
        return Member.builder()
                .providerUserId(userId)
                .providerAccessToken(accessToken)
                .username(username)
                .providerLoginId(loginId)
                .build();
    }
}
