package site.coduo.member.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.member.domain.Member;

@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @AfterEach
    void tearDown() {
        memberRepository.deleteAll();
    }

    @Test
    @DisplayName("회원을 제공자(idP)의 식별자로 조회한다.")
    void find_member_by_provider_identifier() {
        // given
        final String identifier = "some id";

        final Member member = Member.builder()
                .loginId("loginId")
                .userId(identifier)
                .profileImage("some photo")
                .accessToken("some accessCode")
                .username("some username")
                .build();
        memberRepository.save(member);

        // when
        final Optional<Member> find = memberRepository.findByUserId(identifier);

        // then
        assertThat(find).hasValue(member);
    }

}
