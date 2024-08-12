package site.coduo.member.client.dto;

import site.coduo.common.infrastructure.http.Bearer;
import site.coduo.member.domain.Member;

public record GithubUserResponse(String userId, String longin, String avatarUrl) {

    public Member toDomain(final Bearer accessToken, final String username) {
        return Member.builder()
                .profileImage(avatarUrl)
                .userId(userId)
                .loginId(longin)
                .username(username)
                .accessToken(accessToken.getCredential())
                .build();
    }

}
