package site.coduo.referencelink.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.referencelink.exception.InvalidUrlFormatException;

class UrlTest {
    
    @Test
    @DisplayName("Url을 생성한다.")
    void generate_url() {
        // given
        final String urlText = "http://www.some.url";

        // when & then
        assertThatCode(() -> new Url(urlText))
                .doesNotThrowAnyException();
    }

    @Test
    @DisplayName("http:// 또는 https:// 로 시작하지 않으면 예외를 발생한다.")
    void validate_url_protocols() {
        // given
        final String url = "httpx://www.name.com";

        // when & then
        assertThatThrownBy(() -> new Url(url))
                .isInstanceOf(InvalidUrlFormatException.class);
    }

    @Test
    @DisplayName("프로토콜 뒤에 .이 하나 이상없으면 예외를 발생한다.")
    void validate_url_dot() {
        // given
        final String urlText = "https://wwwwww";

        // when & then
        assertThatThrownBy(() -> new Url(urlText))
                .isInstanceOf(InvalidUrlFormatException.class);
    }

    @Test
    @DisplayName("레퍼런스 링크가 빈값이면 예외를 발생한다")
    void throw_exception_when_create_reference_link_with_blank_url() {
        // given
        final String url = "";

        // when & then
        AssertionsForClassTypes.assertThatThrownBy(() -> new Url(url))
                .isInstanceOf(InvalidUrlFormatException.class);
    }


    @Test
    @DisplayName("레퍼런스 링크가 널값이면 예외를 발생한다")
    void throw_exception_when_create_reference_link_with_null_url() {
        // given
        final String url = null;

        // when & then
        AssertionsForClassTypes.assertThatThrownBy(() -> new Url(url))
                .isInstanceOf(InvalidUrlFormatException.class);
    }
}
