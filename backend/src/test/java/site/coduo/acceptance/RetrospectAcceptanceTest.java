package site.coduo.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.fixture.RetrospectCreateRequestFixture;
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
import site.coduo.retrospect.controller.request.CreateRetrospectRequest;
import site.coduo.retrospect.controller.response.ExistRetrospectWithPairRoomResponse;
import site.coduo.retrospect.controller.response.FindRetrospectByIdResponse;
import site.coduo.retrospect.controller.response.FindRetrospectResponse;
import site.coduo.retrospect.controller.response.FindRetrospectsResponse;
import site.coduo.retrospect.domain.RetrospectQuestionType;
import site.coduo.retrospect.repository.RetrospectEntity;
import site.coduo.retrospect.repository.RetrospectRepository;

class RetrospectAcceptanceTest extends AcceptanceFixture {

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

    @DisplayName("회고를 생성한다.")
    @Test
    void createRetrospect() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));

        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final CreateRetrospectRequest request = RetrospectCreateRequestFixture.setCreateRequest();

        // When && Then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))
                .body(request)

                .when()
                .post("/api/retrospects")

                .then()
                .statusCode(HttpStatus.CREATED.value());
    }

    @DisplayName("특정 사용자의 모든 회고 데이터를 조회한다.")
    @Test
    void findRetrospects() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));

        saveRetrospectContents(pairRoomMember);

        final String credentialToken = jwtProvider.sign(savedMember.getUserId());

        // When
        final FindRetrospectsResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/retrospects")

                .then()
                .statusCode(200)
                .extract()
                .as(FindRetrospectsResponse.class);

        final FindRetrospectsResponse expected = new FindRetrospectsResponse(
                List.of(new FindRetrospectResponse("ac", "답변1")));
        // Then
        assertThat(response).isEqualTo(expected);
    }

    @DisplayName("특정 아이디의 회고 데이터를 상세 조회한다.")
    @Test
    void findRetrospectById() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());

        saveRetrospectContents(pairRoomMember);

        // When

        final FindRetrospectByIdResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/retrospects/{accessCode}", savedPairRoom.getAccessCode())

                .then()
                .statusCode(200)
                .extract()
                .as(FindRetrospectByIdResponse.class);

        // Then
        final FindRetrospectByIdResponse expected = new FindRetrospectByIdResponse(
                List.of("답변1", "답변2", "답변3", "답변4", "답변5", "답변6"));
        assertThat(response).isEqualTo(expected);
    }

    @DisplayName("존재하지 않은 회고를 조회하려하면 404를 반환받는다.")
    @Test
    void findNotExistRetrospect() {
        final Member savedMember = saveTestMember();
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/retrospects/{accessCode}", "IAMnoaccess")

                .then()
                .statusCode(404);
    }

    @DisplayName("특정 아이디의 회고를 삭제한다.")
    @Test
    void deleteRetrospect() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));

        // When && Then
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .delete("/api/retrospects/{accessCode}", savedPairRoom.getAccessCode())

                .then()
                .statusCode(204);

    }

    @DisplayName("소유자외 사용자가 권한 없는 접근을 시도하면 예외를 반환받는다.")
    @Test
    void notOwnerAccessFail() {
        // Given
        final Member owner = saveTestMember();
        final Member other = memberRepository.save(
                Member.builder()
                        .userId("userid2")
                        .accessToken("access2")
                        .loginId("login2")
                        .username("username2")
                        .profileImage("some image2")
                        .build()
        );
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, owner));

        // When
        final String otherMemberToken = jwtProvider.sign(other.getUserId());

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", otherMemberToken))

                .when()
                .delete("/api/retrospects/{accessCode}", savedPairRoom.getAccessCode())

                .then()
                .statusCode(400);
    }

    @DisplayName("특정 회원이 특정 페어룸에 작성한 회고가 존재하는지 여부를 조회한다.")
    @Test
    void existRetrospectWithPairRoom() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));

        saveRetrospectContents(pairRoomMember);

        // When
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final ExistRetrospectWithPairRoomResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/member/retrospect/" + "ac" + "/exists")

                .then()
                .statusCode(200)
                .extract()
                .as(ExistRetrospectWithPairRoomResponse.class);

        // Then
        assertThat(response.existRetrospect()).isTrue();
    }

    private Member saveTestMember() {
        return memberRepository.save(
                Member.builder()
                        .userId("userid")
                        .accessToken("access")
                        .loginId("login")
                        .username("username")
                        .profileImage("some image")
                        .build()
        );
    }

    private PairRoomEntity saveTestPairRoom() {
        return pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(
                        PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("레디"), new PairName("파슬리")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("ac"),
                        new AccessCode("ac")
                )
        ));
    }

    private void saveRetrospectContents(final PairRoomMemberEntity pairRoomMember) {
        final List<RetrospectEntity> retrospectContentEntities = List.of(
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.FIRST, "답변1"),
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.SECOND, "답변2"),
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.THIRD, "답변3"),
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변4"),
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변5"),
                new RetrospectEntity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변6")
        );
        retrospectRepository.saveAll(retrospectContentEntities);
    }
}
