package site.coduo.member.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import site.coduo.member.domain.Member;
import site.coduo.member.infrastructure.http.Bearer;

public record GithubUserResponse(@JsonProperty(value = "user_id") String userId,
                                 @JsonProperty(value = "login") String longin,
                                 @JsonProperty(value = "avatar_url") String avatarUrl
) {

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
