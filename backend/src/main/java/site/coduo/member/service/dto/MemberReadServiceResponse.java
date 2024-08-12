package site.coduo.member.service.dto;

import site.coduo.member.domain.Member;

public record MemberReadServiceResponse(String accessToken, String loginId, String userId, String profileImage,
                                        String username) {

    public static MemberReadServiceResponse of(final Member member) {
        return new MemberReadServiceResponse(member.getAccessToken(), member.getLoginId(),
                member.getUserId(), member.getProfileImage(), member.getUsername());
    }
}
