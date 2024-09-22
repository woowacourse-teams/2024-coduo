package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.member.domain.Member;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.security.JwtProvider;
import site.coduo.member.service.dto.member.MemberReadResponse;

@SpringBootTest
@Import(TestConfig.class)
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtProvider jwtProvider;

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
        final String credential = "access-token";
        final String username = "username";

        // when
        memberService.createMember(username, credential);

        // then
        assertThat(memberRepository.findAll()).hasSize(1);
    }

    @Test
    @DisplayName("로그인 토큰을 바탕으로 회원이름을 조회한다.")
    void search_username_by_login_token() {
        // given
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final String sign = jwtProvider.sign(member.getUserId());
        memberRepository.save(member);

        // when
        final MemberReadResponse response = memberService.findMemberNameByCredential(sign);

        // then
        assertThat(response.username()).isEqualTo(member.getUsername());
    }
}
