package site.coduo.oauth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.oauth.client.GithubApiClient;
import site.coduo.oauth.client.dto.GithubUserRequest;
import site.coduo.oauth.client.dto.GithubUserResponse;
import site.coduo.oauth.domain.Member;
import site.coduo.oauth.domain.repository.MemberRepository;
import site.coduo.oauth.service.dto.MemberCreateServiceRequest;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubClient;

    @Transactional
    public void createMember(final MemberCreateServiceRequest request) {
        GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(request.bearer()));
        Member member = userResponse.toDomain(request.bearer(), request.username());
        memberRepository.save(member);
    }
}
