package site.coduo.common.infrastructure.security;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import site.coduo.member.infrastructure.security.JwtProvider;

class JwtProviderTest {

    private final JwtProvider jwtProvider = new JwtProvider();

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(jwtProvider, "key", "test-key+test-key+test-key+test-key+test-key+test");
    }

    @Test
    @DisplayName("sub으로 구성된 jwt 토큰을 생성한다.")
    void produce_jwt_with_sub() {
        // given
        final String sub = "subject";

        // when
        final String jwtToken = jwtProvider.sign(sub);

        // then
        assertThat(jwtProvider.isValid(jwtToken)).isTrue();
    }

    @Test
    @DisplayName("jwt 토큰에서 sub을 추출한다.")
    void extract_sub_in_jwt() {
        // given
        final String sub = "subject";
        final String token = jwtProvider.sign(sub);

        // when
        final String extract = jwtProvider.extractSubject(token);

        // then
        assertThat(extract).isEqualTo(sub);
    }
}
