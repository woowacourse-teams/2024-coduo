package site.coduo.retrospect.controller.response;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fixture.PairRoomFixture;
import site.coduo.member.domain.Member;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContents;

class FindRetrospectByIdResponseTest {

    @DisplayName("Retrospect 객체를 입력받으면 DTO로 변환해 반환한다.")
    @Test
    void createObjectFromRetrospect() {
        // Given
        final long id = 1;
        final PairRoom pairRoom = PairRoomFixture.FRAM_LEMONE_ROOM;
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final RetrospectContents retrospectContents = RetrospectContents.from(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));
        final Retrospect retrospect = new Retrospect(id, pairRoom, member, retrospectContents);

        // When
        final FindRetrospectByIdResponse response = FindRetrospectByIdResponse.from(retrospect);

        // Then
        assertThat(response).isNotNull();
    }
}
