package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;

@Transactional
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

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회한다.")
    void search_all_reference_link() {
        // given
        referenceLinkRepository.save(new ReferenceLink("url1"));
        referenceLinkRepository.save(new ReferenceLink("url2"));
        referenceLinkRepository.save(new ReferenceLink("url3"));

        // when
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLinkQuery();

        // then
        assertThat(responses).hasSize(3);
    }

    @Test
    @DisplayName("레퍼런스 링크를 삭제한다.")
    void delete_reference_link() {
        // given
        final ReferenceLink link = referenceLinkRepository.save(new ReferenceLink("url1"));

        // when
        referenceLinkService.deleteReferenceLinkCommand(link.getId());

        // then
        assertThat(referenceLinkRepository.findAll()).isEmpty();
    }
}
