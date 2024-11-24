package site.coduo.member.client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import site.coduo.member.domain.repository.MemberEntity;
import site.coduo.member.infrastructure.http.Bearer;

public record GithubUserResponse(@JsonProperty(value = "id") String userId,
                                 @JsonProperty(value = "login") String longin,
                                 @JsonProperty(value = "avatar_url") String avatarUrl
) {

    public MemberEntity toDomain(final Bearer accessToken, final String username) {
        return MemberEntity.builder()
                .providerUserId(userId)
                .providerLoginId(longin)
                .username(username)
                .providerAccessToken(accessToken.getCredential())
                .build();
    }
}
