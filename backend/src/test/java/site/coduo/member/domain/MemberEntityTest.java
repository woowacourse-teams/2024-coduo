package site.coduo.member.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fixture.MemberDummy;
import site.coduo.member.domain.repository.MemberEntity;

class MemberEntityTest {

    @Test
    @DisplayName("회원 정보를 수정한다.")
    void update() {
        // given
        final MemberEntity origin = MemberDummy.createDummy("origin", "origin", "origin");
        final MemberEntity change = MemberDummy.createDummy("change", "change", "change");

        // when
        origin.update(change);

        // then
        assertThat(origin)
                .extracting("providerUserId", "providerLoginId", "username", "providerAccessToken")
                .contains(change.getProviderUserId(), change.getProviderLoginId(), change.getUsername(), change.getProviderAccessToken());
    }
}
