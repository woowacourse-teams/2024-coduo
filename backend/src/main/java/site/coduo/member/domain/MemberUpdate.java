package site.coduo.member.domain;

import lombok.AllArgsConstructor;
import site.coduo.member.domain.repository.MemberEntity;

@AllArgsConstructor
public class MemberUpdate {

    private final MemberEntity memberEntity;

    public void update(final String accessToken) {
        final MemberEntity change = MemberEntity.builder()
                .providerLoginId(memberEntity.getProviderLoginId())
                .username(memberEntity.getUsername())
                .providerUserId(memberEntity.getProviderUserId())
                .deletedAt(memberEntity.getDeletedAt())
                .providerAccessToken(accessToken)
                .build();

        memberEntity.update(change);
    }
}
