package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import static site.coduo.fixture.PairRoomFixture.INK_REDDDY_ROOM;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.OpenGraphRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.ReferenceLinkCreateRequest;
import site.coduo.referencelink.service.dto.ReferenceLinkResponse;
import site.coduo.utils.CascadeCleaner;

@SpringBootTest
class ReferenceLinkServiceTest extends CascadeCleaner {

    @Autowired
    private ReferenceLinkService referenceLinkService;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @Autowired
    private OpenGraphRepository openGraphRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("레퍼런스 링크와 오픈그래프를 함께 저장한다.")
    void save_reference_link_and_open_graph() {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final ReferenceLinkCreateRequest request = new ReferenceLinkCreateRequest("https://www.naver.com", null);

        // when
        referenceLinkService.createReferenceLink(pairRoomEntity.getAccessCode(), request);

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).hasSize(1),
                () -> assertThat(openGraphRepository.findAll()).hasSize(1),
                () -> {
                    final ReferenceLinkResponse referenceLinkResponses =
                            referenceLinkService.readAllReferenceLink(pairRoomEntity.getAccessCode()).get(0);
                    assertThat(referenceLinkResponses.url()).isEqualTo(request.url());
                    assertThat(referenceLinkResponses.headTitle()).isEqualTo("NAVER");
                    assertThat(referenceLinkResponses.openGraphTitle()).isEqualTo("네이버");
                }
        );
    }

    @Test
    @DisplayName("모든 레퍼런스 링크를 조회한다.")
    void search_all_reference_link() throws MalformedURLException {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoomEntity, new Category("자바")));
        final AccessCode accessCode = new AccessCode(pairRoomEntity.getAccessCode());
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL("http://url1.com"), accessCode), category, pairRoomEntity));
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL("http://url2.com"), accessCode), category, pairRoomEntity));
        referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL("http://url3.com"), accessCode), category, pairRoomEntity));

        // when
        final List<ReferenceLinkResponse> responses = referenceLinkService.readAllReferenceLink(
                accessCode.getValue());

        // then
        assertThat(responses).hasSize(3);
    }

    @Test
    @DisplayName("레퍼런스 링크와 오픈그래프를 삭제한다.")
    void delete_reference_link_and_open_graph() throws MalformedURLException {
        // given
        final PairRoomEntity pairRoomEntity = pairRoomRepository.save(site.coduo.pairroom.repository.PairRoomEntity.from(INK_REDDDY_ROOM));
        final CategoryEntity category = categoryRepository.save(new CategoryEntity(pairRoomEntity, new Category("리액트")));
        final ReferenceLinkEntity link = referenceLinkRepository.save(
                new ReferenceLinkEntity(new ReferenceLink(new URL("http://url1.com"), new AccessCode(pairRoomEntity.getAccessCode())),
                        category, pairRoomEntity));

        // when
        referenceLinkService.deleteReferenceLink(link.getId());

        // then
        assertAll(
                () -> assertThat(referenceLinkRepository.findAll()).isEmpty(),
                () -> assertThat(openGraphRepository.findAll()).isEmpty()
        );
    }
}
