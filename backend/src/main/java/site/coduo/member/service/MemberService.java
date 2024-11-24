package site.coduo.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.coduo.member.client.GithubApiClient;
import site.coduo.member.client.dto.GithubUserRequest;
import site.coduo.member.client.dto.GithubUserResponse;
import site.coduo.member.domain.repository.MemberEntity;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.InvalidMemberAddException;
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
    public void createMember(final String username, final String encryptedAccessToken) {
        final String accessToken = jwtProvider.extractSubject(encryptedAccessToken);
        final Bearer bearer = new Bearer(accessToken);
        final GithubUserResponse userResponse = githubClient.getUser(new GithubUserRequest(bearer));
        final MemberEntity memberEntity = userResponse.toDomain(bearer, username);
        memberRepository.save(memberEntity);
    }

    public MemberReadResponse findMemberNameByCredential(final String token) {
        final String userId = jwtProvider.extractSubject(token);
        final MemberEntity memberEntity = memberRepository.fetchByUserId(userId);

        return new MemberReadResponse(memberEntity.getUsername());
    }

    public MemberEntity findMemberByCredential(final String token) {
        final String userId = jwtProvider.extractSubject(token);

        return memberRepository.fetchByUserId(userId);
    }

    @Transactional
    public void deleteMember(final String token) {
        final String userId = jwtProvider.extractSubject(token);
        final MemberEntity memberEntity = memberRepository.fetchByUserId(userId);

        memberEntity.delete();
    }

    public MemberEntity checkAndFindMember(final String token, final String loginId) {
        final MemberEntity loginedMemberEntity = findMemberByCredential(token);
        final MemberEntity pairMemberEntity = memberRepository.fetchByProviderLoginId(loginId);

        if (loginedMemberEntity.equals(pairMemberEntity)) {
            throw new InvalidMemberAddException("자신의 아이디로 페어 정보 연동을 할 수 없습니다.");
        }

        return pairMemberEntity;
    }
}
