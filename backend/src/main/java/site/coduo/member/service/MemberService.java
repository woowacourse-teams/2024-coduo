package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.MemberNotFoundException;
import site.coduo.member.infrastructure.http.Bearer;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.service.dto.member.MemberReadResponse;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubClient;
    private final JwtProvider jwtProvider;

    @Transactional
    public void createMember(final String username, final String accessToken) {
        final Bearer bearer = new Bearer(accessToken);
        final GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(bearer));
        final Member member = userResponse.toDomain(bearer, username);

        memberRepository.save(member);
    }

    public MemberReadResponse findMemberNameByCredential(final String token) {
        final String userId = jwtProvider.extractSubject(token);
        final Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는 찾을 수 없는 회원 아이디입니다.", userId)));

        return new MemberReadResponse(member.getUsername());
    }

    public Member findMemberByCredential(final String token) {
        final String userId = jwtProvider.extractSubject(token);
        return memberRepository.findByUserId(userId)
                .orElseThrow(() -> new MemberNotFoundException(String.format("%s는 찾을 수 없는 회원 아이디입니다.", userId)));
    }
}
