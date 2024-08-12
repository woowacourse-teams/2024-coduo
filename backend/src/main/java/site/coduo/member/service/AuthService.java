package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.common.infrastructure.security.JwtProvider;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.MemberNotFoundException;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubApiClient;
    private final JwtProvider jwtProvider;

    @Transactional
    public String createSignInToken(final String accessToken) {
        final GithubUserResponse userResponse = githubApiClient.getUser(new GithubUserRequest(accessToken));
        final Member member = memberRepository.findByUserId(userResponse.userId())
                .orElseThrow(() -> new MemberNotFoundException("회원을 찾을 수 없습니다."));

        return jwtProvider.sign(member.getUserId());
    }
}
