package site.coduo.retrospect.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.retrospect.domain.Retrospect;
import site.coduo.retrospect.domain.RetrospectContent;
import site.coduo.retrospect.repository.RetrospectContentEntity;
import site.coduo.retrospect.repository.RetrospectContentRepository;
import site.coduo.retrospect.repository.RetrospectEntity;
import site.coduo.retrospect.repository.RetrospectRepository;
import site.coduo.timer.repository.TimerRepository;

@SpringBootTest
class RetrospectServiceTest {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

    @Autowired
    private RetrospectRepository retrospectRepository;

    @Autowired
    private RetrospectContentRepository retrospectContentRepository;

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RetrospectService retrospectService;

    @AfterEach
    public void reset() {
        timerRepository.deleteAll();
        categoryRepository.deleteAll();
        retrospectContentRepository.deleteAll();
        retrospectRepository.deleteAll();
        pairRoomMemberRepository.deleteAll();
        memberRepository.deleteAll();
        pairRoomRepository.deleteAll();
    }

    @DisplayName("보안 토큰, 페어룸 접근 코드, 회고 문항 답변이 입력되면 회고와 회고 내용을 생성해 DB에 저장한다.")
    @Test
    void createRetrospect() {
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
        pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));

        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");

        // When
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);

        // Then
        final Optional<RetrospectEntity> retrospectEntity = retrospectRepository.findByPairRoomAndMember(savedPairRoom,
                savedMember);
        assertThat(retrospectEntity).isPresent();

        final List<RetrospectContentEntity> retrospectContentEntities = retrospectContentRepository.findAllByRetrospect(
                retrospectEntity.get());
        assertThat(retrospectContentEntities).isNotEmpty();
    }

    @DisplayName("입력된 페어룸 접근 코드에 대응되는 페어룸 정보가 존재하지 않는다면 예외를 발생시킨다.")
    @Test
    void notExistPairRoomByAccessCode() {
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

        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "kelly-code";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");

        // When & Then
        assertThatThrownBy(() -> retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("입력된 페어룸 접근 코드에 대응되는 페어룸이 존재하지 않습니다. - " + pairRoomAccessCode);
    }

    @DisplayName("입력된 페어룸, 사용자 데이터가 서로 참조되어 있지 않다면 예외를 발생시킨다.")
    @Test
    void notJoinPairRoomAndMember() {
        // Given
        final Member savedMember1 = memberRepository.save(
                Member.builder()
                        .userId("userid1")
                        .accessToken("access1")
                        .loginId("login1")
                        .username("username1")
                        .profileImage("some image")
                        .build()
        );
        final Member savedMember2 = memberRepository.save(
                Member.builder()
                        .userId("userid2")
                        .accessToken("access2")
                        .loginId("login2")
                        .username("username2")
                        .profileImage("some image")
                        .build()
        );
        final PairRoomEntity savedPairRoom = pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"))
        ));
        pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember1));

        final String credentialToken = jwtProvider.sign(savedMember2.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");

        // When & Then
        assertThatThrownBy(() -> retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("입력된 페어룸, 사용자가 서로 참조되어 있지 않습니다.");
    }

    @DisplayName("특정 회원의 모든 회고 데이터를 조회한다.")
    @Test
    void findAllRetrospectsByMember() {
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
        pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);

        // When
        final List<Retrospect> retrospects = retrospectService.findAllRetrospectsByMember(credentialToken);

        // Then
        assertThat(retrospects).hasSize(1);

        final List<RetrospectContent> values = retrospects.get(0).getContents().getValues();
        final Stream<String> findAnswers = values.stream()
                .map(retrospectContent -> retrospectContent.getAnswer().getValue());
        assertThat(findAnswers).isEqualTo(answers);
    }

    @DisplayName("특정 id의 회고 정보를 상세 조회한다.")
    @Test
    void findRetrospectById() {
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
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);
        final RetrospectEntity savedRetrospectEntity = retrospectRepository.findByPairRoomAndMember(savedPairRoom,
                savedMember).get();

        // When
        final Long targetId = savedRetrospectEntity.getId();
        final Retrospect retrospect = retrospectService.findRetrospectById(targetId);

        // Then
        assertThat(retrospect).isNotNull();
    }

    @DisplayName("존재하지 않은 회고 id로 조회 요청이 들어오면 예외를 발생시킨다.")
    @Test
    void findRetrospectByNotExistId() {
        // When & Then
        assertThatThrownBy(() -> retrospectService.findRetrospectById(-1L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("해당 아이디에 일치하는 회고 데이터가 존재하지 않습니다.");
    }

    @DisplayName("입력된 회고 id로 대응되는 회고 데이터를 삭제한다.")
    @Test
    void deleteRetrospect() {
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
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);
        final RetrospectEntity savedRetrospectEntity = retrospectRepository.findByPairRoomAndMember(savedPairRoom, savedMember).get();

        // When
        final Long targetId = savedRetrospectEntity.getId();
        retrospectService.deleteRetrospect(credentialToken, targetId);

        // Then
        assertThatThrownBy(() -> retrospectService.findRetrospectById(targetId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("해당 아이디에 일치하는 회고 데이터가 존재하지 않습니다.");
    }

    @DisplayName("존재하지 않은 회고 id로 삭제 요청이 들어오면 예외를 발생시킨다.")
    @Test
    void deleteRetrospectByNotExistId() {
        // When & Then
        assertThatThrownBy(() -> retrospectService.findRetrospectById(-1L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("해당 아이디에 일치하는 회고 데이터가 존재하지 않습니다.");
    }

    @DisplayName("본인 소유가 아닌 회고 삭제 요청이 들어오면 예외를 발생시킨다.")
    @Test
    void deleteRetrospectWhoNotOwner() {
        // Given
        final Member owner = memberRepository.save(
                Member.builder()
                        .userId("userid1")
                        .accessToken("access1")
                        .loginId("login1")
                        .username("username1")
                        .profileImage("some image1")
                        .build()
        );
        final Member other = memberRepository.save(
                Member.builder()
                        .userId("userid2")
                        .accessToken("access2")
                        .loginId("login2")
                        .username("username3")
                        .profileImage("some image2")
                        .build()
        );
        final PairRoomEntity savedPairRoom = pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("123456"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, owner));
        final String credentialToken = jwtProvider.sign(owner.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);
        final RetrospectEntity savedRetrospectEntity = retrospectRepository.findByPairRoomAndMember(savedPairRoom, owner).get();

        // When & Then
        final String otherCredentialToken = jwtProvider.sign(other.getUserId());
        final Long targetId = savedRetrospectEntity.getId();
        assertThatThrownBy(() -> retrospectService.deleteRetrospect(otherCredentialToken, targetId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("본인 소유가 아닌 회고는 삭제할 수 없습니다.");
    }

    @DisplayName("입력된 페어룸, 회원 정보를 가진 회고가 DB에 존재하는지 여부를 반환한다.")
    @Test
    void existRetrospectWithPairRoom() {
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
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final String pairRoomAccessCode = "123456";
        final List<String> answers = List.of("답변1", "답변2", "답변3", "답변4");
        retrospectService.createRetrospect(credentialToken, pairRoomAccessCode, answers);
        retrospectRepository.findByPairRoomAndMember(savedPairRoom, savedMember).get();

        // When
        final boolean isExist = retrospectService.existRetrospectWithPairRoom(credentialToken, pairRoomAccessCode);

        // Then
        assertThat(isExist).isTrue();
    }
}
