package site.coduo.pairroom.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.pairroom.dto.PairRoomCreateRequest;
import site.coduo.pairroom.exception.PairRoomNotFoundException;

@Transactional
@SpringBootTest
class PairRoomServiceTest {

    @Autowired
    private PairRoomService pairRoomService;

    @Test
    @DisplayName("존재하지 않는 페어룸 접근 코드를 찾으면 예외가 발생한다.")
    void throw_exception_when_find_not_exist_access_code() {
        // given
        final String notSavedAccessCode = "123456";

        // when & then
        assertThatThrownBy(() -> pairRoomService.findByAccessCode(notSavedAccessCode))
                .isExactlyInstanceOf(PairRoomNotFoundException.class);
    }

    @Test
    @DisplayName("페어룸이 존재하지 않는다면 false를 반환한다.")
    void exists_by_access_code_false() {
        //given
        final String notSavedAccessCode = "123456";

        //when & then
        assertThat(pairRoomService.existByAccessCode(notSavedAccessCode)).isFalse();
    }

    @Test
    @DisplayName("페어룸이 존재한다면 true를 반환한다.")
    void exists_by_access_code_true() {
        //given
        final String accessCode = pairRoomService.save(new PairRoomCreateRequest("aPair", "bPair"));

        //when & then
        assertThat(pairRoomService.existByAccessCode(accessCode)).isTrue();
    }
}
