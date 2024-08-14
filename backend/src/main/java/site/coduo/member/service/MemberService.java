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
import site.coduo.member.infrastructure.http.Bearer;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubClient;

    @Transactional
    public void createMember(final String username, final String accessToken) {
        final Bearer bearer = new Bearer(accessToken);
        GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(bearer));
        Member member = userResponse.toDomain(bearer, username);
        log.warn("member access token: {}", member.getAccessToken());
        log.warn("member username: {}", member.getUsername());
        log.warn("member userId: {}", member.getUserId());
        log.warn("member loginId: {}", member.getLoginId());
        log.warn("member profile photo: {}", member.getProfileImage());

        memberRepository.save(member);
    }
}
