package site.coduo.referencelink.domain;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.AccessCode;

class ReferenceLinkTest {

    @Test
    @DisplayName("레퍼런스 링크를 생성한다.")
    void create_reference_link() {
        // given
        final String url = "https://www.google.com";

        // when & then
        assertThatCode(() -> new ReferenceLink(new Url(url), new AccessCode("value")))
                .doesNotThrowAnyException();
    }
}
