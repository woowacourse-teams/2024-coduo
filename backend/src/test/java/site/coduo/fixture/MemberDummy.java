package site.coduo.fixture;

import site.coduo.member.domain.repository.MemberEntity;

public abstract class MemberDummy {

    public static MemberEntity createDummy() {
        return MemberEntity.builder()
                .providerUserId("userId")
                .providerAccessToken("access")
                .providerLoginId("loginId")
                .username("username")
                .build();
    }

    public static MemberEntity createDummy(final String userId) {
        return MemberEntity.builder()
                .providerUserId(userId)
                .providerAccessToken("access")
                .providerLoginId("loginId")
                .username("username")
                .build();
    }

    public static MemberEntity createDummy(final String username, final String accessToken, final String userId) {
        return MemberEntity.builder()
                .providerUserId(userId)
                .providerAccessToken(accessToken)
                .username(username)
                .providerLoginId("")
                .build();
    }

    public static MemberEntity createDummy(final String username, final String accessToken, final String userId, final String loginId) {
        return MemberEntity.builder()
                .providerUserId(userId)
                .providerAccessToken(accessToken)
                .username(username)
                .providerLoginId(loginId)
                .build();
    }
}
