package site.coduo.member.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberTest {

    @Test
    @DisplayName("회원 정보를 수정한다.")
    void update() {
        // given
        final Member origin = Member.builder()
                .userId("origin")
                .loginId("origin")
                .username("origin")
                .profileImage("origin")
                .accessToken("origin")
                .build();

        final Member change = Member.builder()
                .userId("change")
                .loginId("change")
                .username("change")
                .accessToken("change")
                .profileImage("change")
                .build();

        // when
        origin.update(change);

        // then
        assertThat(origin)
                .extracting("userId", "loginId", "username", "accessToken", "profileImage")
                .contains(change.getUserId(), change.getLoginId(), change.getUsername(), change.getAccessToken(),
                        change.getProfileImage());
    }
}
