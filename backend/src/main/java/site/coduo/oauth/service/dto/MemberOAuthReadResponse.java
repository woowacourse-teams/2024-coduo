package site.coduo.oauth.service.dto;

import site.coduo.oauth.domain.Member;

public record MemberOAuthReadResponse(String accessToken, String loginId, String userId, String profileImage,
                                      String username) {

    public static MemberOAuthReadResponse of(final Member member) {
        return new MemberOAuthReadResponse(member.getAccessToken(), member.getLoginId(),
                member.getUserId(), member.getProfileImage(), member.getUsername());
    }
}
