package site.coduo.member.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MemberUpdate {

    private final Member member;

    public void update(final String accessToken) {
        final Member change = Member.builder()
                .providerLoginId(member.getProviderLoginId())
                .username(member.getUsername())
                .providerUserId(member.getProviderUserId())
                .deletedAt(member.getDeletedAt())
                .providerAccessToken(accessToken)
                .build();

        member.update(change);
    }
}
