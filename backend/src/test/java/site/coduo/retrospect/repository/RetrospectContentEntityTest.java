package site.coduo.retrospect.repository;

import static org.assertj.core.api.Assertions.assertThat;

import static site.coduo.fixture.AccessCodeFixture.EASY_ACCESS_CODE_INK_REDDY;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.member.domain.Member;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.domain.RetrospectQuestionType;

class RetrospectContentEntityTest {

    @DisplayName("도메인 객체 RetrospectContent 객체를 생성해 반환한다.")
    @Test
    void toDomain() {
        // Given
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final PairRoomEntity pairRoomEntity = PairRoomEntity.from(new PairRoom(PairRoomStatus.IN_PROGRESS,
                new Pair(new PairName("레디"), new PairName("파슬리")),
                new MissionUrl("https://missionUrl.xxx"),
                new AccessCode("123456"),
                EASY_ACCESS_CODE_INK_REDDY));
        final RetrospectEntity retrospectEntity = new RetrospectEntity(1L, pairRoomEntity, member);
        final RetrospectContentEntity retrospectContentEntity = new RetrospectContentEntity(1L, retrospectEntity,
                RetrospectQuestionType.FIRST, "hihi");

        // When
        final RetrospectContent domain = retrospectContentEntity.toDomain();

        // Then
        assertThat(domain).isNotNull();
    }
}
