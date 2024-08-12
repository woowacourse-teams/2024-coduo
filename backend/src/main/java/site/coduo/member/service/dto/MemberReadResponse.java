package site.coduo.member.service.dto;

import site.coduo.member.domain.Member;

public record MemberReadResponse(String accessToken, String loginId, String userId, String profileImage,
                                 String username) {

    public static MemberReadResponse of(final Member member) {
        return new MemberReadResponse(member.getAccessToken(), member.getLoginId(),
                member.getUserId(), member.getProfileImage(), member.getUsername());
    }
}
