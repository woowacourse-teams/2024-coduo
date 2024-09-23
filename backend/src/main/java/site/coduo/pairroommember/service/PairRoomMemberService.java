package site.coduo.pairroommember.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.MemberNotFoundException;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.pairroommember.repository.PairRoomMemberEntity;
import site.coduo.pairroommember.repository.PairRoomMemberRepository;
import site.coduo.pairroommember.service.dto.PairRoomMemberResponse;

@Service
@RequiredArgsConstructor
@Transactional
public class PairRoomMemberService {

    private final PairRoomMemberRepository pairRoomMemberRepository;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    public List<PairRoomMemberResponse> findPairRooms(final String token) {
        final String userId = jwtProvider.extractSubject(token);
        final Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는 찾을 수 없는 회원 아이디입니다.", userId)));
        final List<PairRoomMemberEntity> pairRooms = pairRoomMemberRepository.findByMember(member);

        return pairRooms.stream()
                .map(PairRoomMemberEntity::getPairRoom)
                .map(PairRoomMemberResponse::from)
                .toList();
    }
}
