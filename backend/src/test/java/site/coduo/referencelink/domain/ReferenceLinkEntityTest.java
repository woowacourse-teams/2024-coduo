package site.coduo.referencelink.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import site.coduo.referencelink.repository.ReferenceLinkEntity;

class ReferenceLinkEntityTest {

    @Test
    @DisplayName("url정보를 수정한다.")
    void update_reference_link_url() {
        // given
        final ReferenceLink origin = new ReferenceLink("url");
        final ReferenceLink expect = new ReferenceLink("change");
        final ReferenceLinkEntity referenceLinkEntity = new ReferenceLinkEntity(origin);

        // when
        referenceLinkEntity.update(expect);

        // then
        assertThat(referenceLinkEntity.getUrl()).isEqualTo(expect.getUrl());
    }
}
