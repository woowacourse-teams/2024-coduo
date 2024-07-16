package site.coduo.referencelink.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ReferenceLinkTest {

    @Test
    @DisplayName("url정보를 수정한다.")
    void update_reference_link_url() {
        // given
        final ReferenceLink referenceLink = new ReferenceLink("url");

        // when
        referenceLink.update("change");

        // then
        assertThat(referenceLink.getUrl()).isEqualTo("change");
    }
}
