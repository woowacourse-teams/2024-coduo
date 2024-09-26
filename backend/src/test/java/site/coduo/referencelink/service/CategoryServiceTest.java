package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import static site.coduo.fixture.AccessCodeFixture.ACCESS_CODE;
import static site.coduo.fixture.PairRoomFixture.FRAM_LEMONE_ROOM;
import static site.coduo.fixture.PairRoomFixture.INK_REDDDY_ROOM;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.ReferenceLink;
import site.coduo.referencelink.exception.InvalidCategoryException;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.repository.ReferenceLinkRepository;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;
import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.CategoryUpdateRequest;
import site.coduo.referencelink.service.dto.CategoryUpdateResponse;
import site.coduo.utils.CascadeCleaner;

@SpringBootTest
class CategoryServiceTest extends CascadeCleaner {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ReferenceLinkRepository referenceLinkRepository;

    @Autowired
    private PairRoomRepository pairRoomRepository;

    @AfterEach
    void tearDown() {
        deleteAllPairRoomCascade();
    }

    @Test
    @DisplayName("페어룸 생성 후 카테고리를 저장한다.")
    void save_category() {
        //given
        final PairRoomEntity entity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        pairRoomRepository.save(entity);

        //when
        final CategoryCreateResponse createdCategory = categoryService.createCategory(ACCESS_CODE.getValue(),
                new CategoryCreateRequest("자바"));

        //then
        final List<CategoryReadResponse> categories = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());
        assertThat(categories.stream().anyMatch(
                category -> category.id().equals(createdCategory.id()) &&
                            category.value().equals(createdCategory.value())))
                .isTrue();
    }

    @Test
    @DisplayName("카테고리를 수정한다.")
    void update_category() {
        //given
        final PairRoomEntity entity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        pairRoomRepository.save(entity);

        final CategoryCreateRequest request = new CategoryCreateRequest("자바");
        final CategoryCreateResponse createdCategory = categoryService.createCategory(ACCESS_CODE.getValue(), request);

        //when
        final CategoryUpdateResponse updatedCategory = categoryService.updateCategoryName(ACCESS_CODE.getValue(),
                new CategoryUpdateRequest(Long.parseLong(createdCategory.id()), "파이썬"));

        //then
        final List<CategoryReadResponse> categories = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());
        assertThat(categories.stream().anyMatch(
                category -> category.id().equals(createdCategory.id()) &&
                            category.value().equals(updatedCategory.updatedCategoryName())))
                .isTrue();
    }

    @Test
    @DisplayName("페어룸에 중복된 카테고리가 있는 경우 저장에 실패한다.")
    void fail_save_category() {
        //given
        final PairRoomEntity entity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        pairRoomRepository.save(entity);

        final CategoryCreateRequest categoryCreateRequest = new CategoryCreateRequest("자바");
        final String accessCode = ACCESS_CODE.getValue();
        categoryService.createCategory(accessCode, categoryCreateRequest);

        //when & then
        assertThatThrownBy(() -> categoryService.createCategory(accessCode, categoryCreateRequest))
                .isInstanceOf(InvalidCategoryException.class);
    }

    @Test
    @DisplayName("페어룸이 다른 경우 중복된 카테고리 저장이 가능하다.")
    void success_save_category() {
        //given
        final PairRoomEntity pairRoom1 = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        final PairRoomEntity pairRoom2 = pairRoomRepository.save(PairRoomEntity.from(FRAM_LEMONE_ROOM));

        pairRoomRepository.save(pairRoom1);
        pairRoomRepository.save(pairRoom2);

        final CategoryCreateRequest categoryCreateRequest = new CategoryCreateRequest("자바");
        categoryService.createCategory(pairRoom1.getAccessCode(), categoryCreateRequest);

        //when & then
        assertThatCode(() -> categoryService.createCategory(pairRoom2.getAccessCode(),
                categoryCreateRequest)).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("카테고리를 삭제한다.")
    void delete_category() {
        //given
        final PairRoomEntity entity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));
        pairRoomRepository.save(entity);

        //when
        final CategoryCreateResponse category = categoryService.createCategory(ACCESS_CODE.getValue(),
                new CategoryCreateRequest("자바"));
        final List<CategoryReadResponse> beforeDelete = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());

        categoryService.deleteCategory(ACCESS_CODE.getValue(), Long.parseLong(category.id()));

        final List<CategoryReadResponse> afterDelete = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());

        //then
        assertThat(beforeDelete).hasSize(1);
        assertThat(afterDelete).isEmpty();
    }

    @Test
    @DisplayName("카테고리가 삭제되면 해당 카테고리로 분류되어 있던 링크의 카테고리는 null이 된다.")
    void remove_category_and_update_reference_category_value() throws MalformedURLException {
        final Category category = new Category("자바");
        final PairRoomEntity entity = pairRoomRepository.save(PairRoomEntity.from(INK_REDDDY_ROOM));

        final CategoryEntity savedCategory = categoryRepository.save(new CategoryEntity(entity, category));
        final ReferenceLink referenceLink = new ReferenceLink(new URL("https://google.com"), ACCESS_CODE);

        final ReferenceLinkEntity beforeDeleteCategory = referenceLinkRepository.save(
                new ReferenceLinkEntity(referenceLink, savedCategory, entity));

        //when
        categoryService.deleteCategory(ACCESS_CODE.getValue(), savedCategory.getId());

        //then
        final ReferenceLinkEntity afterDeleteCategory = referenceLinkRepository.findById(beforeDeleteCategory.getId())
                .orElseThrow();
        assertThat(beforeDeleteCategory.getCategoryEntity()).isEqualTo(savedCategory);
        assertThat(afterDeleteCategory.getCategoryEntity()).isNull();
    }
}
