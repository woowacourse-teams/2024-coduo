package site.coduo.member.domain;

import java.time.LocalDateTime;

import lombok.Builder;

public class Member {

    private final String accessToken;
    private final String loginId;
    private final String username;
    private final LocalDateTime deletedAt;

    @Builder
    private Member(final String accessToken, final String loginId, final String username,
                   final LocalDateTime deletedAt) {
        this.accessToken = accessToken;
        this.loginId = loginId;
        this.username = username;
        this.deletedAt = deletedAt;
    }

}
