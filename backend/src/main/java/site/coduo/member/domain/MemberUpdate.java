package site.coduo.member.domain;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class MemberUpdate {

    private final Member member;

    public void update(final String accessToken) {
        final Member change = Member.builder()
                .profileImage(member.getProfileImage())
                .loginId(member.getLoginId())
                .username(member.getUsername())
                .userId(member.getUserId())
                .accessToken(accessToken)
                .build();

        member.update(change);
    }
}
