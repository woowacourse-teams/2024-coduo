package site.coduo.referencelink.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import static site.coduo.fixture.AccessCodeFixture.ACCESS_CODE;
import static site.coduo.fixture.AccessCodeFixture.ALPHABET_ACCESS_CODE;
import static site.coduo.fixture.AccessCodeFixture.NUMBER_ACCESS_CODE;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
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
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , ACCESS_CODE)
        );
        pairRoomRepository.save(pairRoom);

        //when
        final CategoryCreateResponse createdCategory = categoryService.createCategory(ACCESS_CODE.getValue(),
                new CategoryCreateRequest("자바"));
        final List<CategoryReadResponse> categories = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());

        //then
        assertThat(categories.stream().anyMatch(
                category -> category.id().equals(createdCategory.id()) &&
                            category.value().equals(createdCategory.value())))
                .isTrue();
    }

    @Test
    @DisplayName("카테고리를 수정한다.")
    void update_category() {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , ACCESS_CODE)
        );
        pairRoomRepository.save(pairRoom);
        final String categoryName = "자바";
        final CategoryCreateResponse createdCategory = categoryService.createCategory(ACCESS_CODE.getValue(),
                new CategoryCreateRequest(categoryName));

        //when
        final CategoryUpdateResponse updatedCategory = categoryService.updateCategoryName(ACCESS_CODE.getValue(),
                new CategoryUpdateRequest(categoryName, "파이썬"));

        //then
        final List<CategoryReadResponse> categories = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());
        //then
        assertThat(categories.stream().anyMatch(
                category -> category.id().equals(createdCategory.id()) &&
                            category.value().equals(updatedCategory.updatedCategoryName())))
                .isTrue();
    }

    @Test
    @DisplayName("페어룸에 중복된 카테고리가 있는 경우 저장에 실패한다.")
    void fail_save_category() {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , ACCESS_CODE)
        );

        pairRoomRepository.save(pairRoom);

        final CategoryCreateRequest categoryCreateRequest = new CategoryCreateRequest("자바");
        categoryService.createCategory(ACCESS_CODE.getValue(), categoryCreateRequest);

        //when & then
        assertThatThrownBy(() -> categoryService.createCategory(ACCESS_CODE.getValue(), categoryCreateRequest))
                .isInstanceOf(InvalidCategoryException.class);
    }

    @Test
    @DisplayName("페어룸이 다른 경우 중복된 카테고리 저장이 가능하다.")
    void success_save_category() {
        //given
        final PairRoom numberAccessCodePairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , NUMBER_ACCESS_CODE)
        );
        final PairRoom alphabetAccessCodePairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("프람"),
                                new PairName("레모네")
                        )
                        , ALPHABET_ACCESS_CODE)
        );

        pairRoomRepository.save(numberAccessCodePairRoom);
        pairRoomRepository.save(alphabetAccessCodePairRoom);

        //when & then
        final CategoryCreateRequest categoryCreateRequest = new CategoryCreateRequest("자바");

        assertThatCode(() -> categoryService.createCategory(NUMBER_ACCESS_CODE.getValue(),
                categoryCreateRequest)).doesNotThrowAnyException();
        assertThatCode(() -> categoryService.createCategory(ALPHABET_ACCESS_CODE.getValue(),
                categoryCreateRequest)).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("카테고리를 삭제한다.")
    void delete_category() {
        //given
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , ACCESS_CODE)
        );

        pairRoomRepository.save(pairRoom);

        //when
        categoryService.createCategory(ACCESS_CODE.getValue(), new CategoryCreateRequest("자바"));
        final List<CategoryReadResponse> beforeDelete = categoryService.findAllByPairRoomAccessCode(
                ACCESS_CODE.getValue());

        categoryService.deleteCategory(ACCESS_CODE.getValue(), "자바");

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
        final PairRoom pairRoom = pairRoomRepository.save(
                new PairRoom(
                        new Pair(
                                new PairName("잉크"),
                                new PairName("레디")
                        )
                        , ACCESS_CODE)
        );
        pairRoomRepository.save(pairRoom);
        final CategoryEntity savedCategory = categoryRepository.save(new CategoryEntity(pairRoom, category));
        final ReferenceLink referenceLink = new ReferenceLink(new URL("https://google.com"), ACCESS_CODE);

        final ReferenceLinkEntity savedReferenceLink = referenceLinkRepository.save(
                new ReferenceLinkEntity(referenceLink, savedCategory, pairRoom));

        //when
        final ReferenceLinkEntity beforeDeleteCategory = referenceLinkRepository.findById(savedReferenceLink.getId())
                .orElseThrow();
        categoryService.deleteCategory(ACCESS_CODE.getValue(), category.getValue());

        //then
        final ReferenceLinkEntity afterDeleteCategory = referenceLinkRepository.findById(savedReferenceLink.getId())
                .orElseThrow();

        assertThat(beforeDeleteCategory.getCategoryEntity()).isEqualTo(savedCategory);
        assertThat(afterDeleteCategory.getCategoryEntity()).isNull();
    }
}
