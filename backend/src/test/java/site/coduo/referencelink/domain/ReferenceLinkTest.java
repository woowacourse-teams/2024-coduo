package site.coduo.referencelink.domain;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;

import java.net.URL;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.pairroom.domain.accesscode.AccessCode;

class ReferenceLinkTest {

    @Test
    @DisplayName("레퍼런스 링크를 생성한다.")
    void create_reference_link() {
        // given
        final String url = "https://www.google.com";

        // when & then
        assertThatCode(() -> new ReferenceLink(new URL(url), new AccessCode("value")))
                .doesNotThrowAnyException();
    }
}
