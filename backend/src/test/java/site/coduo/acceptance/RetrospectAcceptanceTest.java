package site.coduo.acceptance;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import io.restassured.RestAssured;
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

class RetrospectAcceptanceTest extends AcceptanceFixture {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private PairRoomMemberRepository pairRoomMemberRepository;

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
}
