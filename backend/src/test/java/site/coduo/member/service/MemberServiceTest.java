package site.coduo.member.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import site.coduo.config.TestConfig;
import site.coduo.member.domain.repository.MemberRepository;
import site.coduo.member.infrastructure.http.Bearer;
import site.coduo.member.service.dto.SignUpServiceRequest;

@SpringBootTest
@Import(TestConfig.class)
class MemberServiceTest {

    @Autowired
    private MemberService MemberService;

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
        SignUpServiceRequest request = new SignUpServiceRequest(new Bearer("access-token"), "username");

        // when
        MemberService.createMember(request);

        // then
        assertThat(memberRepository.findAll()).hasSize(1);
    }
}
