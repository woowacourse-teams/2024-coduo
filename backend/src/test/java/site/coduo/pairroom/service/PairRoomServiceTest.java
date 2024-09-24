package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import java.util.List;
import java.util.Random;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;
import site.coduo.timer.repository.TimerRepository;

@Transactional
@SpringBootTest
class PairRoomServiceTest {

    @Autowired
    private PairRoomService pairRoomService;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TimerRepository timerRepository;
    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L,
                        PairRoomStatus.IN_PROGRESS.name());

        // when
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // then
        assertThatCode(() -> pairRoomService.findByAccessCode(accessCode))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("페어룸을 생성할때 타이머도 함께 생성된다..")
    void create_timer_when_create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L,
                        PairRoomStatus.IN_PROGRESS.name());

        // when
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // then
        assertThat(timerRepository.findAll()).hasSize(1);
    }


    @Test
    @Transactional
    @DisplayName("존재하지 않는 페어룸 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_not_exist_access_code() {
        // given
        final String notSavedAccessCode = "123456";

        // when & then
        assertThatThrownBy(() -> pairRoomService.findByAccessCode(notSavedAccessCode))
                .isExactlyInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("페어룸 상태를 변경한다.")
    void update_pair_room_status() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, PairRoomStatus.IN_PROGRESS.name());
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // when
        pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name());

        // then
        assertThat(PairRoomStatus.findByName(pairRoomService.findByAccessCode(accessCode).status()))
                .isEqualTo(PairRoomStatus.COMPLETED);
    }

    @Test
    @DisplayName("페어 역할을 변경한다.")
    void change_pair_room() {
        // given
        final PairRoomEntity entity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("fram"), new PairName("lemonL")),
                        new AccessCode("1234"))
        );
        pairRoomRepository.save(entity);

        // when
        pairRoomService.updateNavigatorWithDriver(entity.getAccessCode());

        // then
        assertThat(entity)
                .extracting("navigator", "driver")
                .contains("lemonL", "fram");
    }


    @DisplayName("멤버의 방 목록을 가져온다.")
    @Test
    void find_rooms_by_member() {
        //given
        final Member memberA = createMember("reddevilmidzy");
        final Member memberB = createMember("test");

        final PairRoomCreateRequest pairRoomCreateRequest = new PairRoomCreateRequest("레디", "잉크", 1, 1,
                "IN_PROGRESS");

        final String accessCodeA_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeA_2 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeB_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberB.getAccessToken());
        pairRoomService.savePairRoom(pairRoomCreateRequest, null);

        final List<String> memberAExpected = List.of(accessCodeA_1, accessCodeA_2);
        final List<String> memberBExpected = List.of(accessCodeB_1);

        //when
        final List<String> findAccessCodesForMemberA = pairRoomService.findPairRooms(memberA.getAccessToken())
                .stream()
                .map(PairRoomMemberResponse::accessCode)
                .toList();
        final List<String> findAccessCodesForMemberB = pairRoomService.findPairRooms(memberB.getAccessToken())
                .stream()
                .map(PairRoomMemberResponse::accessCode)
                .toList();

        //then
        assertThat(findAccessCodesForMemberA).hasSize(2)
                .containsAll(memberAExpected);
        assertThat(findAccessCodesForMemberB).hasSize(1)
                .containsAll(memberBExpected);
    }

    private Member createMember(final String userId) {
        final String token = jwtProvider.sign(userId);
        final Member member = Member.builder()
                .accessToken(token)
                .loginId("login id")
                .profileImage("profile image")
                .username("hello" + new Random().nextInt())
                .userId(userId)
                .build();
        return memberRepository.save(member);
    }
}
