package site.coduo.pairroommember.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroom.service.PairRoomService;
import site.coduo.pairroom.service.dto.PairRoomCreateRequest;
import site.coduo.pairroommember.service.dto.PairRoomMemberResponse;

@SpringBootTest
class PairRoomMemberServiceTest {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PairRoomMemberService pairRoomMemberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PairRoomService pairRoomService;

    @DisplayName("멤버의 방 목록을 가져온다.")
    @Test
    void find_rooms_by_member() {

        final String targetToken = jwtProvider.sign("userId");
        final String test = jwtProvider.sign("test");

        final Member targetMember = Member.builder()
                .accessToken(targetToken)
                .loginId("login id")
                .profileImage("profile image")
                .username("hello")
                .userId("user id")
                .build();

        final Member member2 = Member.builder()
                .accessToken(test)
                .loginId("test id")
                .profileImage("profile image")
                .username("world")
                .userId("test id")
                .build();

        memberRepository.save(targetMember);
        memberRepository.save(member2);

        final PairRoomCreateRequest pairRoomCreateRequest1 = new PairRoomCreateRequest("레디", "잉크", 1, 1,
                "IN_PROGRESS");
        final PairRoomCreateRequest pairRoomCreateRequest2 = new PairRoomCreateRequest("레디", "프람", 1, 1,
                "IN_PROGRESS");
        final PairRoomCreateRequest pairRoomCreateRequest3 = new PairRoomCreateRequest("잉크", "프람", 1, 1,
                "IN_PROGRESS");

        final String accessCode1 = pairRoomService.saveMemberPairRoom(pairRoomCreateRequest1, targetToken);
        final String accessCode2 = pairRoomService.saveMemberPairRoom(pairRoomCreateRequest2, targetToken);
        final String accessCode3 = pairRoomService.saveNonMemberPairRoom(pairRoomCreateRequest3);

        final List<PairRoomMemberResponse> pairRooms = pairRoomMemberService.findPairRooms(targetToken);
        final List<String> findAccessCodes = pairRooms.stream()
                .map(PairRoomMemberResponse::accessCode)
                .toList();
        final List<String> expected = List.of(accessCode1, accessCode2);

        assertThat(findAccessCodes).hasSize(2)
                .containsAll(expected);
    }
}
