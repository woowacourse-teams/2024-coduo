package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.domain.MemberUpdate;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.service.dto.CreateSignInTokenRequest;
import site.coduo.member.service.dto.SignInServiceResponse;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final GithubApiClient githubApiClient;
    private final JwtProvider jwtProvider;

    @Transactional
    public SignInServiceResponse createSignInToken(final CreateSignInTokenRequest request) {
        request.validateCreateRequest();
        final GithubUserResponse userResponse = githubApiClient.getUser(new GithubUserRequest(request.accessToken()));
        final String signInToken = jwtProvider.sign(userResponse.userId());

        memberRepository.findByUserId(userResponse.userId())
                .ifPresent(member -> new MemberUpdate(member).update(request.accessToken()));

        return new SignInServiceResponse(memberRepository.existsByUserId(userResponse.userId()), signInToken);
    }
}
