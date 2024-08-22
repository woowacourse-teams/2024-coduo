package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.fake.SequentialAccessCodeStrategy;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.domain.accesscode.AccessCodeFactory;

class AccessCodeFactoryTest {

    @Test
    @DisplayName("중복이 없는 엑세스 코드를 생성한다.")
    void generate_unique_access_code() {
        // given
        final AccessCodeFactory sut = new AccessCodeFactory(new SequentialAccessCodeStrategy());
        final List<AccessCode> accessCodes = List.of(new AccessCode("FAKE_1"),
                new AccessCode("FAKE_2"),
                new AccessCode("FAKE_3"),
                new AccessCode("FAKE_4"));

        // when
        final AccessCode accessCode = sut.generate(accessCodes);

        // then
        assertThat(accessCode).isEqualTo(new AccessCode("FAKE_5"));
    }
}
