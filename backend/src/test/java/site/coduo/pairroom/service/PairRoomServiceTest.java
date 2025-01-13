package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.AccessCodeFixture.EASY_ACCESS_CODE_FRAM_LEMONE;
import static site.coduo.fixture.AccessCodeFixture.EASY_ACCESS_CODE_INK_REDDY;

import java.util.List;
import java.util.Random;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.fixture.MemberDummy;
import site.coduo.fixture.PairRoomCreateRequestFixture;
import site.coduo.member.domain.repository.MemberEntity;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.exception.InactivePairRoomException;
import site.coduo.pairroom.exception.PairRoomNotFoundException;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMember;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomEntireResponse;
import site.coduo.pairroom.service.dto.PairRoomMemberResponse;
import site.coduo.timer.domain.Timer;
import site.coduo.timer.repository.TimerEntity;
import site.coduo.timer.repository.TimerRepository;

@SpringBootTest
@Transactional
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
        final PairRoomCreateRequest request = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;

        // when
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // then
        assertThatCode(() -> pairRoomService.findEntirePairRoom(accessCode))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("페어룸을 생성할때 타이머도 함께 생성된다.")
    void create_timer_when_create_pair_room() {
        // given
        final PairRoomCreateRequest request = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;

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
        assertThatThrownBy(() -> pairRoomService.findEntirePairRoom(notSavedAccessCode))
                .isExactlyInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("삭제된 페어룸의 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_delete_pair_room_access_code() {
        // given
        final PairRoomCreateRequest request = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;
        final String accessCode = pairRoomService.savePairRoom(request, null);

        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.updateStatus(PairRoomStatus.DELETED);

        // when & then
        assertThatThrownBy(() -> pairRoomService.findEntirePairRoom(accessCode))
                .isExactlyInstanceOf(InactivePairRoomException.class);
    }

    @Test
    @DisplayName("페어룸 상태를 변경한다.")
    void update_pair_room_status() {
        // given
        final PairRoomCreateRequest request = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;
        final String accessCode = pairRoomService.savePairRoom(request, null);

        // when
        pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name());

        // then
        assertThat(PairRoomStatus.findByName(pairRoomService.findEntirePairRoom(accessCode).status()))
                .isEqualTo(PairRoomStatus.COMPLETED);
    }

    @Test
    @DisplayName("삭제된 페어룸 상태를 변경하려고 하면 예외를 발생시킨다.")
    void update_delete_pair_room_status() {
        // given
        final PairRoomCreateRequest request = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;
        final String accessCode = pairRoomService.savePairRoom(request, null);
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(accessCode);
        pairRoomEntity.updateStatus(PairRoomStatus.DELETED);

        // when & then
        assertThatThrownBy(() -> pairRoomService.updatePairRoomStatus(accessCode, PairRoomStatus.COMPLETED.name()))
                .isExactlyInstanceOf(InactivePairRoomException.class);
    }

    @Test
    @DisplayName("페어 역할을 변경한다.")
    void change_pair_room() {
        // given
        final PairRoomEntity entity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("fram"), new PairName("lemonL")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("1234"),
                        new AccessCode("fram와 lemonL"))
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
                        new AccessCode("1234"),
                        new AccessCode("fram와 lemonL"))
        );
        pairRoomRepository.save(entity);

        // when & then
        assertThatThrownBy(() -> pairRoomService.updateNavigatorWithDriver(entity.getAccessCode()))
                .isExactlyInstanceOf(InactivePairRoomException.class);
    }

    @DisplayName("삭제되지 않은, 멤버의 방 목록을 가져온다.")
    @Test
    void find_rooms_by_member() {
        //given
        final MemberEntity memberEntityA = createMember("reddevilmidzy");
        final MemberEntity memberEntityB = createMember("test");

        final PairRoomCreateRequest pairRoomCreateRequest = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;

        final String accessCodeA_1 = pairRoomService.savePairRoom(pairRoomCreateRequest,
                memberEntityA.getProviderAccessToken());
        final String accessCodeA_2 = pairRoomService.savePairRoom(pairRoomCreateRequest,
                memberEntityA.getProviderAccessToken());
        final String accessCodeB_1 = pairRoomService.savePairRoom(pairRoomCreateRequest,
                memberEntityB.getProviderAccessToken());
        pairRoomService.savePairRoom(pairRoomCreateRequest, null);

        final PairRoomCreateRequest deletePairRoomCreateRequest = PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST;
        final String accessToken1 = pairRoomService.savePairRoom(deletePairRoomCreateRequest,
                memberEntityA.getProviderAccessToken());
        final String accessToken2 = pairRoomService.savePairRoom(deletePairRoomCreateRequest,
                memberEntityA.getProviderAccessToken());
        final String accessToken3 = pairRoomService.savePairRoom(deletePairRoomCreateRequest,
                memberEntityA.getProviderAccessToken());

        pairRoomRepository.fetchByAccessCode(accessToken1).updateStatus(PairRoomStatus.DELETED);
        pairRoomRepository.fetchByAccessCode(accessToken2).updateStatus(PairRoomStatus.DELETED);
        pairRoomRepository.fetchByAccessCode(accessToken3).updateStatus(PairRoomStatus.DELETED);

        final List<String> memberAExpected = List.of(accessCodeA_1, accessCodeA_2);
        final List<String> memberBExpected = List.of(accessCodeB_1);

        //when
        final List<String> findAccessCodesForMemberA = pairRoomService.findPairRooms(
                        memberEntityA.getProviderAccessToken())
                .stream()
                .map(PairRoomMemberResponse::accessCode)
                .toList();
        final List<String> findAccessCodesForMemberB = pairRoomService.findPairRooms(
                        memberEntityB.getProviderAccessToken())
                .stream()
                .map(PairRoomMemberResponse::accessCode)
                .toList();

        //then
        assertThat(findAccessCodesForMemberA).hasSize(2)
                .containsAll(memberAExpected);
        assertThat(findAccessCodesForMemberB).hasSize(1)
                .containsAll(memberBExpected);
    }

    private MemberEntity createMember(final String userId) {
        final String token = jwtProvider.sign(userId);
        final MemberEntity memberEntity = MemberDummy.createDummy("hello" + new Random().nextInt(), token, userId);
        return memberRepository.save(memberEntity);
    }

    @Test
    @DisplayName("페어룸을 반환할 때 타이머 정보도 함께 반환한다.")
    void get_pair_room_and_timer() {
        // given
        final PairRoomEntity pairRoomEntity = PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"),
                        EASY_ACCESS_CODE_FRAM_LEMONE)
        );
        final Timer timer = new Timer(
                new AccessCode(pairRoomEntity.getAccessCode()),
                10000,
                10000
        );
        pairRoomRepository.save(pairRoomEntity);
        timerRepository.save(new TimerEntity(timer, pairRoomEntity));

        // when
        final PairRoomEntireResponse actual = pairRoomService.findEntirePairRoom(
                pairRoomEntity.getAccessCode());

        // then
        assertThat(actual)
                .extracting("pairRoomInfo.navigator", "pairRoomInfo.driver", "pairRoomInfo.status",
                        "pairRoomInfo.duration", "pairRoomInfo.remainingTime")
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
                        accessCode,
                        EASY_ACCESS_CODE_FRAM_LEMONE
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
        final MemberEntity savedMemberEntity = memberRepository.save(MemberDummy.createDummy());
        final PairRoomEntity savedPairRoom = pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"),
                        EASY_ACCESS_CODE_INK_REDDY)
        ));
        pairRoomMemberRepository.save(new PairRoomMember(savedPairRoom, savedMemberEntity));

        // When
        final String credentialToken = jwtProvider.sign(savedMemberEntity.getProviderUserId());
        final boolean existMemberInPairRoom = pairRoomService.existMemberInPairRoom(credentialToken, "123456");

        // Then
        assertThat(existMemberInPairRoom).isTrue();
    }

    @DisplayName("존재하지 않은 페어룸의 코드가 입력되면 예외를 발생시킨다.")
    @Test
    void existMemberInPairRoomWithNotExistRoomCode() {
        // Given
        final MemberEntity savedMemberEntity = memberRepository.save(MemberDummy.createDummy());

        // When & Then
        final String credentialToken = jwtProvider.sign(savedMemberEntity.getProviderUserId());
        assertThatThrownBy(() -> pairRoomService.existMemberInPairRoom(credentialToken, "no-code"))
                .isInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("페어가 회원가입한 유저인 경우 페어의 나의 페이지에서도 조회가 가능하다.")
    void createPairRoomRegisteredPair() {
        //given
        final MemberEntity me = MemberDummy.createDummy("pairNameA", jwtProvider.sign("pairA"), "pairA", "loginIdA");
        memberRepository.save(me);

        final MemberEntity pair = MemberDummy.createDummy("pairNameB", jwtProvider.sign("pairB"), "pairB", "loginIdB");
        memberRepository.save(pair);

        final PairRoomCreateRequest request = new PairRoomCreateRequest("navi", "dri", pair.getProviderLoginId(),
                60000L, 60000L, "");

        //when
        pairRoomService.savePairRoom(request, me.getProviderAccessToken());

        //then
        final List<PairRoomMember> mine = pairRoomMemberRepository.findByMemberEntity(me);
        final List<PairRoomMember> pairsList = pairRoomMemberRepository.findByMemberEntity(pair);
        assertThat(mine).hasSize(1);
        assertThat(pairsList).hasSize(1);
    }
}
