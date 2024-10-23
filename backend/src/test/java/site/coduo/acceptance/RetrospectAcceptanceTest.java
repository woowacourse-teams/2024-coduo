package site.coduo.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
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
import site.coduo.retrospect.domain.RetrospectQuestionType;
import site.coduo.retrospect.repository.RetrospectV2Entity;
import site.coduo.retrospect.repository.RetrospectV2Repository;

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
    private RetrospectV2Repository retrospectV2Repository;

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
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/retrospects")

                .then().log().all()
                .extract();

        // Then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat((List) response.jsonPath().get("retrospects")).hasSize(1);
            softly.assertThat((int) response.jsonPath().get("retrospects[0].retrospectId")).isEqualTo(0);
            softly.assertThat((String) response.jsonPath().get("retrospects[0].accessCode")).isEqualTo("ac");
            softly.assertThat((String) response.jsonPath().get("retrospects[0].answer")).isEqualTo("답변1");
        });
    }

    @DisplayName("특정 아이디의 회고 데이터를 상세 조회한다.")
    @Test
    void findRetrospectById() {
        // Given
        final PairRoomEntity savedPairRoom = saveTestPairRoom();
        final Member savedMember = saveTestMember();
        final PairRoomMemberEntity pairRoomMember = pairRoomMemberRepository.save(
                new PairRoomMemberEntity(savedPairRoom, savedMember));

        saveRetrospectContents(pairRoomMember);

        // When

        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)

                .when()
                .get("/api/retrospects/{accessCode}", savedPairRoom.getAccessCode())

                .then()
                .extract();

        // Then
        final List<String> expect = List.of("답변1", "답변2", "답변3", "답변4", "답변5", "답변6");
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat((String) response.jsonPath().get("accessCode")).isEqualTo("ac");
            softly.assertThat((List) response.jsonPath().get("answers")).isEqualTo(expect);
        });
    }

    @DisplayName("존재하지 않은 회고를 조회하려하면 404를 반환받는다.")
    @Test
    void findNotExistRetrospect() {
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)

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
    void notOwnerAccessToForbiddenJon() {
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
        final String credentialToken = jwtProvider.sign(other.getUserId());
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .delete("/api/retrospects/{accessCode}", savedPairRoom.getAccessCode())

                .then()
                .extract();

        // Then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat((String) response.jsonPath().get("message")).isEqualTo("회고 소유자 외 접근할 수 없는 작업입니다.");
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
        final List<RetrospectV2Entity> retrospectContentEntities = List.of(
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.FIRST, "답변1"),
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.SECOND, "답변2"),
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.THIRD, "답변3"),
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변4"),
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변5"),
                new RetrospectV2Entity(pairRoomMember, RetrospectQuestionType.FOURTH, "답변6")
        );
        retrospectV2Repository.saveAll(retrospectContentEntities);
    }
}
