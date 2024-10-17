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
import site.coduo.retrospect.domain.RetrospectQuestionType;
import site.coduo.retrospect.repository.RetrospectContentEntity;
import site.coduo.retrospect.repository.RetrospectContentRepository;
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

    @Autowired
    private RetrospectContentRepository retrospectContentRepository;

    @DisplayName("회고를 생성한다.")
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
        final CreateRetrospectRequest request = new CreateRetrospectRequest(
                "123456",
                List.of("회고 답변 1", "회고 답변 2", "회고 답변 3", "회고 답변 4")
        );

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
                        new AccessCode("ac"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());

        final RetrospectEntity retrospectEntity = retrospectRepository.save(
                new RetrospectEntity(savedPairRoom, savedMember));
        final List<RetrospectContentEntity> retrospectContentEntities = List.of(
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FIRST, "답변1"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.SECOND, "답변2"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.THIRD, "답변3"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FOURTH, "답변4")
        );
        retrospectContentRepository.saveAll(retrospectContentEntities);

        // When
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/retrospects")

                .then()
                .extract();

        // Then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat((List) response.jsonPath().get("retrospects")).hasSize(1);
            softly.assertThat((int) response.jsonPath().get("retrospects[0].retrospectId")).isEqualTo(0);
            softly.assertThat((String) response.jsonPath().get("retrospects[0].pairRoomAccessCode")).isEqualTo("ac");
            softly.assertThat((String) response.jsonPath().get("retrospects[0].answer")).isEqualTo("답변1");
        });
    }

    @DisplayName("특정 아이디의 회고 데이터를 상세 조회한다.")
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
                        new AccessCode("ac"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));

        final RetrospectEntity retrospectEntity = retrospectRepository.save(
                new RetrospectEntity(savedPairRoom, savedMember));
        final List<RetrospectContentEntity> retrospectContentEntities = List.of(
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FIRST, "답변1"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.SECOND, "답변2"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.THIRD, "답변3"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FOURTH, "답변4")
        );
        retrospectContentRepository.saveAll(retrospectContentEntities);

        // When
        final long targetId = retrospectEntity.getId();
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)

                .when()
                .get("/api/retrospects/" + targetId)

                .then()
                .log().all()
                .extract();

        // Then
        final List<String> expect = List.of("답변1", "답변2", "답변3", "답변4");
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat((String) response.jsonPath().get("pairRoomAccessCode")).isEqualTo("ac");
            softly.assertThat((List) response.jsonPath().get("answers")).isEqualTo(expect);
        });
    }

    @DisplayName("특정 아이디의 회고를 삭제한다.")
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
                        new AccessCode("ac"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));

        final RetrospectEntity retrospectEntity = retrospectRepository.save(
                new RetrospectEntity(savedPairRoom, savedMember));
        final List<RetrospectContentEntity> retrospectContentEntities = List.of(
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FIRST, "답변1"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.SECOND, "답변2"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.THIRD, "답변3"),
                new RetrospectContentEntity(retrospectEntity, RetrospectQuestionType.FOURTH, "답변4")
        );
        retrospectContentRepository.saveAll(retrospectContentEntities);

        // When
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final long targetId = retrospectEntity.getId();
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .delete("/api/retrospects/" + targetId)

                .then()
                .log().all()
                .extract();

        // Then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
