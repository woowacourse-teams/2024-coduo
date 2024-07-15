package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;

@SpringBootTest
class ReferenceLinkServiceTest {

    @Autowired
    private ReferenceLinkService referenceLinkService;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Test
    @DisplayName("레퍼런스 링크를 저장한다.")
    void save_reference_link() {
        // given
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest("url");

        // when
        referenceLinkService.createReferenceLinkCommand(request);

        // then
        assertThat(referenceLinkRepository.findAll())
                .hasSize(1);
    }
}
