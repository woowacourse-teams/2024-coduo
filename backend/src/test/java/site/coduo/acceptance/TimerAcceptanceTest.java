package site.coduo.acceptance;

import static site.coduo.acceptance.SseAcceptanceTest.createConnect;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.fake.FakeGithubOAuthClient;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.timer.service.dto.TimerUpdateRequest;

class TimerAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

    static String createPairRoom(final PairRoomCreateRequest pairRoom) {
        final PairRoomCreateResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(pairRoom)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);

        return response.accessCode();
    }

    static String createPairRoom(final PairRoomCreateRequest pairRoom, final String token) {
        final PairRoomCreateResponse response = RestAssured
                .given()
                .cookie("coduo_whoami", token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(pairRoom)

                .when()
                .post("/api/pair-room")

                .then()
                .extract()
                .as(PairRoomCreateResponse.class);

        return response.accessCode();
    }

    private static void timerStart(final String accessCode) {
        createConnect(accessCode);
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/start", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 조회한다.")
    void get_timer() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "켈리",
                "파란",
                10000L,
                10000L,
                "https://missionUrl.xxx",
                PairRoomStatus.IN_PROGRESS.name())
        );

        // when & then
        RestAssured
                .given()

                .when()
                .get("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("페어룸의 타이머를 업데이트 한다.")
    void update_timer_duration() {
        // given
        final String accessCode = createPairRoom(new PairRoomCreateRequest(
                "해시",
                "파슬리",
                10000L,
                10000L,
                "https://missionUrl.xxx",
                PairRoomStatus.IN_PROGRESS.name())
        );
        final TimerUpdateRequest request = new TimerUpdateRequest(20000L, 3000L);
        createConnect(accessCode);
        // when & then
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .patch("/api/{accessCode}/timer", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 시작한다.")
    void start_timer() {
        // given
        final String accessCode = createPairRoom(
                new PairRoomCreateRequest("fram", "lemone", 10000L, 10000L, "https://missionUrl.xxx",
                        PairRoomStatus.IN_PROGRESS.name()));
        createConnect(accessCode);

        // when & then
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/start", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머를 종료한다.")
    void stop_timer() {
        // given
        final String accessCode = createPairRoom(
                new PairRoomCreateRequest("fram", "lemone", 10000L, 10000L, "https://missionUrl.xxx",
                        PairRoomStatus.IN_PROGRESS.name()));
        timerStart(accessCode);

        // when & then
        RestAssured
                .given()

                .when()
                .patch("/api/{accessCode}/timer/stop", accessCode)

                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("타이머 비활성화 요칭 시,로그인 쿠키가 없으면 400을 반환한다.")
    void return_400_status_code_without_login_cookie() {
        // given
        final PairRoomCreateRequest pairRoom = new PairRoomCreateRequest("fram", "lemone", 10000L,
                10000L, "https://missionUrl.xxx", PairRoomStatus.IN_PROGRESS.name());
        final String userId = "userId";
        final String token = jwtProvider.sign(userId);
        saveMember(userId);
        final String accessCode = createPairRoom(pairRoom, token);

        // when & then
        RestAssured
                .given()
                .when()
                .pathParam("accessCode", accessCode)
                .patch("/api/{accessCode}/timer/disable")

                .then().log().all()
                .statusCode(400);
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
        final String accessCode = createPairRoom(pairRoom, token);
        createConnect(accessCode);
        TimerAcceptanceTest.timerStart(accessCode);

        // when & then
        RestAssured
                .given()
                .cookie("coduo_whoami", token)
                .when()
                .pathParam("accessCode", accessCode)
                .patch("/api/{accessCode}/timer/disable")

                .then().log().all()
                .statusCode(200);
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

    @Test
    @DisplayName("자신의 방이 아닌 방에 타이머를 비활성 요칭 시,  403 상태코드를 반환한다.")
    void return_403_status_code_when_timer_disable_request_to_does_not_exist_pair_room() {
        // given
        final PairRoomCreateRequest pairRoom = new PairRoomCreateRequest("fram", "lemone", 10000L,
                10000L, "https://missionUrl.xxx", PairRoomStatus.IN_PROGRESS.name());
        final String userId = "userId";
        final String token = jwtProvider.sign(userId);
        saveMember(userId);

        // when & then
        RestAssured
                .given()
                .cookie("coduo_whoami", token)

                .when()
                .pathParam("accessCode", "does not exist")
                .patch("/api/{accessCode}/timer/disable")

                .then().log().all()
                .statusCode(403);
    }
}
