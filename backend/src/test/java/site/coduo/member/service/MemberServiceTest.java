package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

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
        final String token = jwtProvider.sign(credential);
        final String username = "username";

        // when
        memberService.createMember(username, token);

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

    @Test
    @DisplayName("로그인 토큰을 바탕으로 회원 엔티티를 조회한다.")
    void search_member_by_login_token() {
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
        final Member findMember = memberService.findMemberByCredential(sign);

        // then
        assertThat(findMember.getUsername()).isEqualTo(member.getUsername());
    }

    @Test
    @DisplayName("회원을 삭제한다.")
    void delete_member() {
        // given
        final Member member = Member.builder()
                .userId("userid")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();
        final String token = jwtProvider.sign(member.getUserId());

        memberRepository.save(member);
        final List<Member> beforeDelete = memberRepository.findAll();

        // when
        memberService.deleteMember(token);

        //then
        final List<Member> afterDelete = memberRepository.findAll();
        assertThat(afterDelete).hasSize(beforeDelete.size() - 1);
    }

    @Test
    @DisplayName("user id로 회원을 조회한다.")
    void find_by_user_id() {
        //given
        final Member member = Member.builder()
                .userId("targetUserId")
                .accessToken("access")
                .loginId("login")
                .username("username")
                .profileImage("some image")
                .build();

        final Member saved = memberRepository.save(member);

        //when
        final Member find = memberService.findMember(member.getLoginId());

        //then
        assertThat(find).isEqualTo(saved);
    }
}
