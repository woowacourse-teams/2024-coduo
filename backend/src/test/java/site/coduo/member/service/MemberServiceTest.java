package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.common.infrastructure.security.Bearer;
import site.coduo.config.TestConfig;
import site.coduo.fake.FakeGithubApiClient;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.exception.MemberNotFoundException;
import site.coduo.member.service.dto.MemberOAuthCreateRequest;
import site.coduo.member.service.dto.MemberReadServiceResponse;

@SpringBootTest
@Import(TestConfig.class)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @AfterEach
    void tearDown() {
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("회원을 저장한다.")
    void save_member() {
        // given
        MemberOAuthCreateRequest request = new MemberOAuthCreateRequest(new Bearer("access-token"), "username");

        // when
        memberService.createMember(request);

        // then
        assertThat(memberRepository.findAll()).hasSize(1);
    }

    @Test
    @DisplayName("엑세스 토큰으로 회원을 조회한다.")
    void search_member_by_access_token() {
        // given
        Member member = createMember("username", FakeGithubApiClient.ACCESS_TOKEN, FakeGithubApiClient.USER_ID);
        Bearer bearer = new Bearer(member.getAccessToken());

        // when
        MemberReadServiceResponse response = memberService.findMember(bearer);

        // then
        assertThat(response.username()).isEqualTo(member.getUsername());
    }

    @Test
    @DisplayName("존재하지 않는 엑세스 토큰으로 조회화면 예외를 발생시킨다.")
    void throw_exception_when_search_by_does_not_exists_access_token() {
        // given
        Bearer bearer = new Bearer("does not exist token");

        // when & then
        assertThatThrownBy(() -> memberService.findMember(bearer))
                .isInstanceOf(MemberNotFoundException.class);
    }

    private Member createMember(String username, String accessToken, String userId) {
        Member member = Member.builder()
                .username(username)
                .accessToken(accessToken)
                .loginId("")
                .userId(userId)
                .profileImage("")
                .build();

        return memberRepository.save(member);
    }

}
