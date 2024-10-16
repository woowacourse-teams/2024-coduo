package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

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
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.DeletePairRoomException;
import site.coduo.pairroom.exception.InvalidAccessCodeException;
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
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx",
                        PairRoomStatus.IN_PROGRESS.name());

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
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx",
                        PairRoomStatus.IN_PROGRESS.name());

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
                        "https://missionUrl.xxx", PairRoomStatus.DELETED.name());
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // when & then
        assertThatThrownBy(() -> pairRoomService.findPairRoomAndTimer(accessCode))
                .isExactlyInstanceOf(DeletePairRoomException.class);
    }

    @Test
    @DisplayName("페어룸 상태를 변경한다.")
    void update_pair_room_status() {
        // given
        final PairRoomCreateRequest request =
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx",
                        PairRoomStatus.IN_PROGRESS.name());
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
                new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx",
                        PairRoomStatus.DELETED.name());
        final String accessCode = pairRoomService.savePairRoom(request, null);

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
                "https://missionUrl.xxx",
                "IN_PROGRESS");

        final String accessCodeA_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeA_2 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberA.getAccessToken());
        final String accessCodeB_1 = pairRoomService.savePairRoom(pairRoomCreateRequest, memberB.getAccessToken());
        pairRoomService.savePairRoom(pairRoomCreateRequest, null);

        final PairRoomCreateRequest deletePairRoomCreateRequest = new PairRoomCreateRequest("레디", "잉크", 1, 1,
                "https://missionUrl.xxx", PairRoomStatus.DELETED.name());
        pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());
        pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());
        pairRoomService.savePairRoom(deletePairRoomCreateRequest, memberA.getAccessToken());

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
        final String code = "123456";
        final AccessCode accessCode = new AccessCode(code);
        final PairRoomEntity pairRoomEntity = createPairRoom(code);
        pairRoomRepository.save(pairRoomEntity);

        //when & then
        assertAll(
                () -> assertThat(pairRoomService.existsByAccessCode("not-exist")).isFalse(),
                () -> assertThat(pairRoomService.existsByAccessCode(accessCode.getValue())).isTrue()

        );
    }

    @Test
    @DisplayName("특정 멤버가 해당 엑세스코드의 방 참가자인지 판별한다. - 참")
    void check_is_consistent_of_specific_access_code_pair_room_true_case() {
        // given
        final String accessCode = "123456";
        final PairRoomEntity pairRoomEntity = createPairRoom(accessCode);
        pairRoomRepository.save(pairRoomEntity);
        final String memberId = "memberId";
        final Member member = createMember(memberId);
        pairRoomMemberRepository.save(new PairRoomMemberEntity(pairRoomEntity, member));
        final String token = jwtProvider.sign(memberId);

        // when
        final boolean participant = pairRoomService.isParticipant(token, accessCode);

        // then
        assertThat(participant).isTrue();
    }

    private PairRoomEntity createPairRoom(final String code) {
        final AccessCode accessCode = new AccessCode(code);
        return PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("레모네")),
                        new MissionUrl("https://missionUrl.xxx"),
                        accessCode
                ));
    }

    @Test
    @DisplayName("특정 멤버가 해당 엑세스코드의 방 참가자인지 판별한다. - 거짓")
    void check_is_consistent_of_specific_access_code_pair_room_false_case() {
        // given
        final String accessCode = "123456";
        final PairRoomEntity pairRoomEntity = createPairRoom(accessCode);
        pairRoomRepository.save(pairRoomEntity);
        final String memberId = "memberId";
        createMember(memberId);
        final String token = jwtProvider.sign(memberId);

        // when
        final boolean participant = pairRoomService.isParticipant(token, accessCode);

        // then
        assertThat(participant).isFalse();
    }

    @Test
    @DisplayName("엑세스코드로 페어룸이 삭제되었는지 검증한다.")
    void validate_pair_room_is_deleted() {
        // given
        final String accessCode = "code";
        final PairRoomEntity pairRoom = createPairRoom(accessCode, PairRoomStatus.COMPLETED);
        pairRoomRepository.save(pairRoom);

        // when & then
        assertThatCode(() -> pairRoomService.validateNotDeleted(accessCode))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("엑세스코드로가 삭제 상태가 아니면 예외를 던진다.")
    void throw_exception_when_pair_room_did_not_deleted() {
        // given
        final String accessCode = "code";
        final PairRoomEntity pairRoom = createPairRoom(accessCode, PairRoomStatus.DELETED);
        pairRoomRepository.save(pairRoom);

        // when & then
        assertThatThrownBy(() -> pairRoomService.validateNotDeleted(accessCode))
                .isInstanceOf(InvalidAccessCodeException.class);
    }

    private PairRoomEntity createPairRoom(final String code, final PairRoomStatus pairRoomStatus) {
        final AccessCode accessCode = new AccessCode(code);
        return PairRoomEntity.from(
                new PairRoom(pairRoomStatus,
                        new Pair(new PairName("레디"), new PairName("레모네")),
                        new MissionUrl("https://missionUrl.xxx"),
                        accessCode
                ));
    }
}
