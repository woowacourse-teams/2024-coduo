package site.coduo.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import site.coduo.member.domain.Member;
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
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomExistResponse;

class PairRoomAcceptanceTest extends AcceptanceFixture {

    static PairRoomCreateResponse createPairRoom(final PairRoomCreateRequest request) {
        return RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);
    }

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PairRoomRepository pairRoomRepository;
    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

    @Test
    @DisplayName("페어룸 요청 시 정보를 반환한다.")
    void show_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 10000L, 10000L, "https://missionUrl.xxx"));

        //when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType("application/json")

                .when()
                .get("/api/pair-room/" + pairRoomUrl.accessCode())

                .then()
                .log()
                .all()
                .statusCode(200);
    }

    @Test
    @DisplayName("페어룸의 상태를 변경한다.")
    void update_pair_room_status() {
        //given
        final PairRoomCreateResponse accessCode =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx"));
        final Map<String, String> status = Map.of("status", PairRoomStatus.IN_PROGRESS.name());

        // when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType(ContentType.JSON)
                .body(status)

                .when()
                .patch("/api/pair-room/{accessCode}/status", accessCode.accessCode())

                .then()
                .log()
                .all()
                .statusCode(204);
    }

    @Test
    @DisplayName("페어룸의 드라이버와 내비게이터를 변경한다.")
    void update_driver_navigator() {
        // given
        final PairRoomCreateResponse accessCode =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx"));

        // when & then
        RestAssured
                .given()
                .log()
                .all()

                .when()
                .patch("/api/pair-room/{access-code}/pair-swap", accessCode.accessCode())

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("페어룸이 존재하면 true를 반환한다.")
    void exist_pair_room_true() {
        //given
        final PairRoomCreateResponse accessCode =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx"));

        // when & then
        final PairRoomExistResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .log()
                .all()

                .when()
                .queryParam("access_code", accessCode.accessCode())
                .get("/api/pair-room/exists")

                .then()
                .statusCode(200)
                .extract()
                .as(PairRoomExistResponse.class);

        assertThat(response.exists()).isTrue();
    }

    @Test
    @DisplayName("페어룸이 존재하면 false를 반환한다.")
    void exist_pair_room_false() {
        //given

        // when & then
        final PairRoomExistResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .log()
                .all()

                .when()
                .queryParam("access_code", "babyroom")
                .get("/api/pair-room/exists")

                .then()
                .statusCode(200)
                .extract()
                .as(PairRoomExistResponse.class);

        assertThat(response.exists()).isFalse();
    }

    @Test
    @DisplayName("페어룸을 삭제한다.")
    void delete_pair_room() {
        // given
        final PairRoomCreateResponse accessCode =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx"));

        // when & then
        RestAssured
                .given()
                .log()
                .all()

                .when()
                .delete("/api/pair-room/{access-code}", accessCode.accessCode())

                .then()
                .statusCode(204);
    }

    @DisplayName("특정 회원이 특정 페어룸에 존재하는지 여부를 조회한다.")
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
                        new AccessCode("ac"))
        ));
        pairRoomMemberRepository.save(new PairRoomMemberEntity(savedPairRoom, savedMember));

        // When
        final String credentialToken = jwtProvider.sign(savedMember.getUserId());
        final ExtractableResponse<Response> response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .cookies(Map.of("coduo_whoami", credentialToken))

                .when()
                .get("/api/member/ac/exists")

                .then()
                .log().all()
                .extract();

        // Then
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat((Boolean) response.jsonPath().get("exists")).isEqualTo(true);
        });
    }
}
