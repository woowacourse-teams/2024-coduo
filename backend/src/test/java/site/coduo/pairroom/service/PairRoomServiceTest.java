package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

import java.util.List;
import java.util.Random;

import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.DeletePairRoomException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;
import site.coduo.pairroom.service.dto.PairRoomReadResponse;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
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
    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

    @Test
    @DisplayName("페어룸을 생성한다.")
    void create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx");

        // when
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // then
        assertThatCode(() -> pairRoomService.findPairRoomAndTimer(accessCode))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("페어룸을 생성할때 타이머도 함께 생성된다.")
    void create_timer_when_create_pair_room() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx");

        // when
        pairRoomService.savePairRoom(request, null);

        // then
        assertThat(timerRepository.findAll()).hasSize(1);
    }


    @Test
    @DisplayName("존재하지 않는 페어룸 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_not_exist_access_code() {
        // given
        final String notSavedAccessCode = "123456";

        // when & then
        assertThatThrownBy(() -> pairRoomService.findPairRoomAndTimer(notSavedAccessCode))
                .isExactlyInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("삭제된 페어룸의 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_delete_pair_room_access_code() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L,
                        "https://missionUrl.xxx");
        final String accessCode = pairRoomService.savePairRoom(request, null);

        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.updateStatus(PairRoomStatus.DELETED);

        // when & then
        assertThatThrownBy(() -> pairRoomService.findPairRoomAndTimer(accessCode))
                .isExactlyInstanceOf(DeletePairRoomException.class);
    }

    @Test
    @DisplayName("페어룸 상태를 변경한다.")
    void update_pair_room_status() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx");
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // when
        pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name());

        // then
        assertThat(PairRoomStatus.findByName(pairRoomService.findPairRoomAndTimer(accessCode).status()))
                .isEqualTo(PairRoomStatus.COMPLETED);
    }

    @Test
    @DisplayName("삭제된 페어룸 상태를 변경하려고 하면 예외를 발생시킨다.")
    void update_delete_pair_room_status() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx");
        final String accessCode = pairRoomService.savePairRoom(request, null);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.updateStatus(PairRoomStatus.DELETED);

        // when & then
        assertThatThrownBy(() -> pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name()))
                .isExactlyInstanceOf(DeletePairRoomException.class);
    }

    @Test
    @DisplayName("페어 역할을 변경한다.")
    void change_pair_room() {
        // given
        final PairRoomEntity entity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("fram"), new PairName("lemonL")),
                        new MissionUrl("https://missionUrl.xxx"),
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

    @Test
    @DisplayName("삭제된 페어룸의 페어 역할을 변경하려하면 예외를 발생시킨다.")
    void change_delete_pair_room_role() {
        // given
        final PairRoomEntity entity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.DELETED,
                        new Pair(new PairName("fram"), new PairName("lemonL")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("1234"))
        );
        pairRoomRepository.save(entity);

        // when & then
        assertThatThrownBy(() -> pairRoomService.updateNavigatorWithDriver(entity.getAccessCode()))
                .isExactlyInstanceOf(DeletePairRoomException.class);
    }

    @DisplayName("삭제되지 않은, 멤버의 방 목록을 가져온다.")
    @Test
    void find_rooms_by_member() {
        //given
        final Member memberA = createMember("reddevilmidzy");
        final Member memberB = createMember("test");

        final PairRoomCreateRequest pairRoomCreateRequest = new PairRoomCreateRequest("레디", "잉크", 1, 1,
                "https://missionUrl.xxx");

        final String accessCodeA_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeA_2 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeB_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberB.getAccessToken());
        pairRoomService.savePairRoom(pairRoomCreateRequest, null);

        final PairRoomCreateRequest deletePairRoomCreateRequest = new PairRoomCreateRequest("레디", "잉크", 1, 1,
                "https://missionUrl.xxx");
        final String accessToken1 = pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());
        final String accessToken2 = pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());
        final String accessToken3 = pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());

        pairRoomRepository.fetchByAccessCode(accessToken1).updateStatus(PairRoomStatus.DELETED);
        pairRoomRepository.fetchByAccessCode(accessToken2).updateStatus(PairRoomStatus.DELETED);
        pairRoomRepository.fetchByAccessCode(accessToken3).updateStatus(PairRoomStatus.DELETED);

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

    @Test
    @DisplayName("페어룸을 반환할 때 타이머 정보도 함께 반환한다.")
    void get_pair_room_and_timer() {
        // given
        final PairRoomEntity pairRoomEntity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"))
        );
        final Timer timer = new Timer(
                new AccessCode(pairRoomEntity.getAccessCode()),
                10000,
                10000
        );
        pairRoomRepository.save(pairRoomEntity);
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        // when
        final PairRoomReadResponse actual = pairRoomService.findPairRoomAndTimer(
                pairRoomEntity.getAccessCode());

        // then
        assertThat(actual)
                .extracting("navigator", "driver", "status", "duration", "remainingTime")
                .contains(pairRoomEntity.getNavigator(), pairRoomEntity.getDriver(),
                        pairRoomEntity.getStatus().toString(), timer.getDuration(), timer.getRemainingTime());
    }

    @Test
    @DisplayName("페어룸이 존재하는지 확인한다.")
    void exists_pair_room() {
        //given
        final AccessCode accessCode = new AccessCode("123456");
        final PairRoomEntity pairRoomEntity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("레모네")),
                        new MissionUrl("https://missionUrl.xxx"),
                        accessCode
                ));
        pairRoomRepository.save(pairRoomEntity);

        //when & then
        assertAll(
                () -> assertThat(pairRoomService.existsByAccessCode("not-exist")).isFalse(),
                () -> assertThat(pairRoomService.existsByAccessCode(accessCode.getValue())).isTrue()

        );
    }

    @DisplayName("특정 회원이 특정 페어룸에 존재하는지 여부를 반환한다.")
    @Test
    void existMemberInPairRoom() {
        // Given
        final Member savedMember = memberRepository.save(
                Member.builder()
                        .userId("userid")
                        .accessToken("access")
                        .loginId("login")
                        .username("username")
                        .profileImage("some image")
                        .build()
        );
        final PairRoomEntity savedPairRoom = pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));

        // When
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final boolean existMemberInPairRoom = pairRoomService.existMemberInPairRoom(credentialToken, "123456");

        // Then
        assertThat(existMemberInPairRoom).isTrue();
    }

    @DisplayName("존재하지 않은 페어룸의 코드가 입력되면 예외를 발생시킨다.")
    @Test
    void existMemberInPairRoomWithNotExistRoomCode() {
        // Given
        final Member savedMember = memberRepository.save(
                Member.builder()
                        .userId("userid")
                        .accessToken("access")
                        .loginId("login")
                        .username("username")
                        .profileImage("some image")
                        .build()
        );

        // When & Then
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        assertThatThrownBy(() -> pairRoomService.existMemberInPairRoom(credentialToken, "no-code"))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("입력된 페어룸 접근 코드에 대응되는 페어룸이 존재하지 않습니다. - no-code");
    }
}
