package site.coduo.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.hamcrest.Matchers.hasSize;

import static site.coduo.common.config.web.filter.SignInCookieFilter.SIGN_IN_COOKIE_NAME;
import static site.coduo.fixture.AccessCodeFixture.EASY_ACCESS_CODE_INK_REDDY;

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
import site.coduo.fixture.PairRoomCreateRequestFixture;
import site.coduo.member.domain.Member;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.domain.MissionUrl;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.RoomName;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomMemberEntity;
import site.coduo.pairroom.repository.PairRoomMemberRepository;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroom.service.dto.PairRoomCreateResponse;
import site.coduo.pairroom.service.dto.PairRoomExistByEasyAccessCodeResponse;
import site.coduo.pairroom.service.dto.PairRoomExistResponse;

class PairRoomAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PairRoomRepository pairRoomRepository;
    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

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

    @Test
    @DisplayName("페어룸 요청 시 정보를 반환한다.")
    void show_pair_room() {
        //given
        final PairRoomCreateResponse pairRoomUrl =
                createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

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
                createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);
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
                createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

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
                createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

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
    @DisplayName("페어 이름 액세스코드를 사용하여 페어룸이 존재하면 true와 accessCode 를 반환한다.")
    void exist_pair_room_by_easy_access_code_true() {
        //given
        final PairRoomEntity savedPairRoom = pairRoomRepository.save(PairRoomEntity.from(
                new PairRoom(PairRoomStatus.IN_PROGRESS,
                        new Pair(new PairName("잉크"), new PairName("레디")),
                        new MissionUrl("https://missionUrl.xxx"),
                        new AccessCode("ac"),
                        EASY_ACCESS_CODE_INK_REDDY,
                        new RoomName("방 이름"))));

        // when & then
        final PairRoomExistByEasyAccessCodeResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .log()
                .all()

                .when()
                .queryParam("easy_access_code", savedPairRoom.getEasyAccessCode())
                .get("/api/pair-room/exists/easy")

                .then()
                .statusCode(200)
                .extract()
                .as(PairRoomExistByEasyAccessCodeResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.exists()).isTrue();
            softly.assertThat(response.accessCode()).isEqualTo(savedPairRoom.getAccessCode());
        });
    }

    @Test
    @DisplayName("페어 이름 액세스코드를 사용하여 페어룸이 존재하지 않으면 false와 null을 반환한다.")
    void not_exist_pair_room_by_easy_access_code_false() {
        //given

        // when & then
        final PairRoomExistByEasyAccessCodeResponse response = RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .log()
                .all()

                .when()
                .queryParam("easy_access_code", "easy access code")
                .get("/api/pair-room/exists/easy")

                .then()
                .statusCode(200)
                .extract()
                .as(PairRoomExistByEasyAccessCodeResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.exists()).isFalse();
            softly.assertThat(response.accessCode()).isNull();
        });
    }

    @Test
    @DisplayName("페어룸을 삭제한다.")
    void delete_pair_room() {
        // given
        final PairRoomCreateResponse accessCode = createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);

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
    @DisplayName("깃허브 id로 추가된 사용자가 자신의 페어룸 목록에서 페어룸을 확인할 수 있다.")
    void add_pair_and_find_my_pair_room() {
        //given
        final Member pairRoomCreator = Member.builder()
                .userId("idA")
                .accessToken(jwtProvider.sign("idA"))
                .loginId("loginAA")
                .username("redddy")
                .profileImage("some image")
                .build();

        final Member addPair = Member.builder()
                .userId("idB")
                .accessToken(jwtProvider.sign("idB"))
                .loginId("loginBB")
                .username("hash")
                .profileImage("some image")
                .build();

        memberRepository.save(pairRoomCreator);
        memberRepository.save(addPair);

        final PairRoomCreateRequest request = new PairRoomCreateRequest("navi", "dri", addPair.getLoginId(), 60000L,
                60000L, "");

        RestAssured
                .given()
                .cookie(SIGN_IN_COOKIE_NAME, pairRoomCreator.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .body(request)

                .when()
                .post("/api/pair-room")

                .then()
                .statusCode(201);

        //when && then
        RestAssured
                .given()
                .cookie(SIGN_IN_COOKIE_NAME, addPair.getAccessToken())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE)

                .when()
                .get("/api/my-pair-rooms")

                .then()
                .statusCode(200)
                .body("$", hasSize(1));
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
                        new AccessCode("ac"),
                        EASY_ACCESS_CODE_INK_REDDY,
                        new RoomName("방 이름"))
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

    @Test
    @DisplayName("방 이름을 변경한다.")
    void update_room_name() {
        //given
        final PairRoomCreateResponse accessCode =
                createPairRoom(PairRoomCreateRequestFixture.PAIR_ROOM_CREATE_REQUEST);
        final Map<String, String> status = Map.of("roomName", "changeRoomName");

        // when & then
        RestAssured
                .given()
                .log()
                .all()
                .contentType(ContentType.JSON)
                .body(status)

                .when()
                .patch("/api/pair-room/{accessCode}/room-name", accessCode.accessCode())

                .then()
                .log()
                .all()
                .statusCode(204);

        final String changedRoomName = pairRoomRepository.findByAccessCode(accessCode.accessCode()).get().getRoomName();
        assertThat(changedRoomName).isEqualTo("changeRoomName");
    }
}
