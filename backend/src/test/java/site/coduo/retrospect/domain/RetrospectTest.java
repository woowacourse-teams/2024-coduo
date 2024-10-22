package site.coduo.retrospect.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fixture.PairRoomFixture;
import site.coduo.member.domain.Member;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.retrospect.exception.InvalidRetrospectContentException;
import site.coduo.retrospect.exception.InvalidRetrospectInputValueException;

class RetrospectTest {

    @DisplayName("유효한 id, 페어룸, 회원, 회고 내용 값들을 입력하면 객체를 생성한다.")
    @Test
    void createObject() {
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
        final RetrospectContents retrospectContents = RetrospectContents.of(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));

        // When
        final Retrospect retrospect = new Retrospect(id, pairRoom, member, retrospectContents);

        // Then
        assertThat(retrospect).isNotNull();
    }

    @DisplayName("아이디 값을 제외하고 객체를 생성하면 기본 값으로 0이 입력된다.")
    @Test
    void createObjectWithoutId() {
        // Given
        final PairRoom pairRoom = PairRoomFixture.FRAM_LEMONE_ROOM;
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final RetrospectContents retrospectContents = RetrospectContents.of(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));

        // When
        final Retrospect retrospect = new Retrospect(pairRoom, member, retrospectContents);
        
        // Then
        assertThat(retrospect.getId()).isEqualTo(0);
    }
    
    @DisplayName("아이디로 음수가 입력되면 예외를 발생시킨다.")  
    @Test        
    void inputMinusId() {
        // Given
        final long id = -1;
        final PairRoom pairRoom = PairRoomFixture.FRAM_LEMONE_ROOM;
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final RetrospectContents retrospectContents = RetrospectContents.of(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));
                
        // When & Then
        assertThatThrownBy(() -> new Retrospect(id, pairRoom, member, retrospectContents))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("회고 아이디 값은 음수가 입력될 수 없습니다. - " + id);
    }

    @DisplayName("페어룸으로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void inputNullPairRoom() {
        // Given
        final long id = 1;
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final RetrospectContents retrospectContents = RetrospectContents.of(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));

        // When & Then
        assertThatThrownBy(() -> new Retrospect(id, null, member, retrospectContents))
                .isInstanceOf(InvalidRetrospectInputValueException.class)
                .hasMessage("페어룸 객체로 null을 입력할 수 없습니다.");
    }

    @DisplayName("회원으로 null이 입력되면 예외를 발생시킨다.")
    @Test
    void inputNullMember() {
        // Given
        final long id = 1;
        final PairRoom pairRoom = PairRoomFixture.FRAM_LEMONE_ROOM;
        final RetrospectContents retrospectContents = RetrospectContents.of(
                List.of("회고 답변1", "회고 답변2", "회고 답변3", "회고 답변4", "회고 답변5", "회고 답변6"));

        // When & Then
        assertThatThrownBy(() -> new Retrospect(id, pairRoom, null, retrospectContents))
                .isInstanceOf(InvalidRetrospectInputValueException.class)
                .hasMessage("회원 객체로 null을 입력할 수 없습니다.");
    }

    @DisplayName("아이디 값을 제외하고 객체를 생성하면 기본 값으로 0이 입력된다.")
    @Test
    void inputNullContents() {
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

        // When & Then
        assertThatThrownBy(() -> new Retrospect(id, pairRoom, member, null))
                .isInstanceOf(InvalidRetrospectContentException.class)
                .hasMessage("회고 내용들로 null을 입력할 수 없습니다.");
    }
}
