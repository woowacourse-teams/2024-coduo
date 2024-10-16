package site.coduo.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomExistResponse;

class PairRoomAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

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

    static PairRoomCreateResponse createPairRoom(final PairRoomCreateRequest request, final String loginCookie) {
        return RestAssured
                .given()
                .cookie("coduo_whoami", loginCookie)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);
    }

    @Test
    @DisplayName("페어룸 요청 시 정보를 반환한다.")
    void show_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl =
                createPairRoom(
                        new PairRoomCreateRequest("레디", "프람", 10000L, 10000L, "https://missionUrl.xxx", "IN_PROGRESS"));

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
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx", "IN_PROGRESS"));
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
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx", "IN_PROGRESS"));

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
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx", "IN_PROGRESS"));

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
                        new PairRoomCreateRequest("레디", "프람", 1000L, 100L, "https://missionUrl.xxx", "IN_PROGRESS"));

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

    @Test
    @DisplayName("타이머 기능을 비활성화는 SSE커넥션이 있는 상태에서만 가능하다.")
    void disable_pair_room_timer() {
        // given
        final PairRoomCreateRequest pairRoom = new PairRoomCreateRequest("fram", "lemone", 10000L,
                10000L, "https://missionUrl.xxx", PairRoomStatus.IN_PROGRESS.name());
        final String userId = "userId";
        final String token = jwtProvider.sign(userId);
        saveMember(userId);
        final PairRoomCreateResponse response = createPairRoom(pairRoom, token);
        TimerAcceptanceTest.timerStart(response.accessCode());

        // when & then
        RestAssured
                .given()

                .when()
                .pathParam("accessCode", response.accessCode())
                .patch("/api/pair-room/{accessCode}/complete")

                .then().log().all()
                .statusCode(204);
    }

    private void saveMember(final String userId) {
        final Member member = Member.builder()
                .username("test user")
                .userId(userId)
                .loginId(FakeGithubApiClient.LOGIN_ID)
                .accessToken(FakeGithubOAuthClient.ACCESS_TOKEN.getCredential())
                .profileImage(FakeGithubApiClient.PROFILE_IMAGE)
                .build();

        memberRepository.save(member);
    }
}
