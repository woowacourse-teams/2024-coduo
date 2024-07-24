package site.coduo.referencelink.domain;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.referencelink.exception.InvalidUrlFormatException;

class ReferenceLinkTest {

    @Test
    @DisplayName("레퍼런스 링크를 생성한다.")
    void create_reference_link() {
        // given
        final String url = "https://www.google.com";

        // when & then
        assertThatCode(() -> new ReferenceLink(url))
                .doesNotThrowAnyException();
    }


    @Test
    @DisplayName("레퍼런스 링크가 빈값이면 예외를 발생한다")
    void throw_exception_when_create_reference_link_with_blank_url() {
        // given
        final String url = "";

        // when & then
        assertThatThrownBy(() -> new ReferenceLink(url))
                .isInstanceOf(InvalidUrlFormatException.class);
    }

    @Test
    @DisplayName("레퍼런스 링크가 빈값이면 예외를 발생한다")
    void throw_exception_when_create_reference_link_with_null_url() {
        // given
        final String url = null;

        // when & then
        assertThatThrownBy(() -> new ReferenceLink(url))
                .isInstanceOf(InvalidUrlFormatException.class);
    }
}
