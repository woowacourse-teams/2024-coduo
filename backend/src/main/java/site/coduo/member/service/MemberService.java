package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.common.infrastructure.security.Bearer;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.MemberNotFoundException;
import site.coduo.member.service.dto.MemberOAuthCreateRequest;
import site.coduo.member.service.dto.MemberReadServiceResponse;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubClient;

    @Transactional
    public void createMember(final MemberOAuthCreateRequest request) {
        GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(request.bearer()));
        Member member = userResponse.toDomain(request.bearer(), request.username());
        memberRepository.save(member);
    }

    public MemberReadServiceResponse findMember(final Bearer accessToken) {
        GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(accessToken));
        Member member = memberRepository.findByUserId(userResponse.userId())
                .orElseThrow(() -> new MemberNotFoundException("찾을 수 없는 회원입니다."));

        return MemberReadServiceResponse.of(member);
    }
}
