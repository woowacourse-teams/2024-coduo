package site.coduo.pairroom.domain.accesscode;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AccessCodeGeneratorTest {

    @DisplayName("드라이버의 이름이 한글이고 마지막 글자에 받침이 있으면 '과'를 후치사로 붙인다.")
    @Test
    void set_post_position_when_with_final_consonant() {
        //given
        final String driverName = "받침있음";

        //when
        final String accessCode = AccessCodeGenerator.generate(driverName, "내비게이터");

        //then
        int postPositionIndex = accessCode.indexOf(driverName) + driverName.length();
        assertThat(accessCode.charAt(postPositionIndex)).isEqualTo('과');
    }

    @DisplayName("드라이버의 이름이 한글이고 마지막 글자에 받침이 없거나 한글이 아니면 '와'를 후치사로 붙인다.")
    @Test
    void set_post_position_when_without_final_consonant() {
        //given
        final String driverName = "받침없다";

        //when
        final String accessCode = AccessCodeGenerator.generate(driverName, "내비게이터");

        //then
        final int postPositionIndex = accessCode.indexOf(driverName) + driverName.length();
        assertThat(accessCode.charAt(postPositionIndex)).isEqualTo('와');
    }
}
