package site.coduo.pairroom.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.exception.DuplicatePairNameException;

class PairTest {

    @Test
    @DisplayName("각 페어의 이름이 중복되면 예외가 발생한다.")
    void throw_exception_when_pair_name_is_duplicated() {
        // given
        final PairName navigator = new PairName("레디");
        final PairName driver = new PairName("레디");

        assertThatThrownBy(() -> new Pair(navigator, driver))
                .isInstanceOf(DuplicatePairNameException.class);
    }
}
