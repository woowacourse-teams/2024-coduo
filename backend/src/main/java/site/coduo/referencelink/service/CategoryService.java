package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.pairroom.repository.PairRoomRepository;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.exception.InvalidCategoryException;
import site.coduo.referencelink.repository.CategoryEntity;
import site.coduo.referencelink.repository.CategoryRepository;
import site.coduo.referencelink.repository.ReferenceLinkEntity;
import site.coduo.referencelink.service.dto.CategoryCreateRequest;
import site.coduo.referencelink.service.dto.CategoryCreateResponse;
import site.coduo.referencelink.service.dto.CategoryReadResponse;
import site.coduo.referencelink.service.dto.CategoryUpdateRequest;
import site.coduo.referencelink.service.dto.CategoryUpdateResponse;

@Transactional
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final PairRoomRepository pairRoomRepository;
    private final ReferenceLinkService referenceLinkService;

    @Transactional(readOnly = true)
    public List<CategoryReadResponse> findAllByPairRoomAccessCode(final String accessCode) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));

        return categoryRepository.findAllByPairRoomEntity(pairRoomEntity)
                .stream()
                .map(CategoryReadResponse::from)
                .toList();
    }

    public CategoryCreateResponse createCategory(final String accessCode, final CategoryCreateRequest request) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        validateDuplicated(request.value(), pairRoomEntity);
        final CategoryEntity categoryEntity = categoryRepository.save(
                new CategoryEntity(pairRoomEntity, new Category(request.value())));

        return CategoryCreateResponse.from(categoryEntity);
    }

    private void validateDuplicated(final String categoryName, final PairRoomEntity pairRoomEntity) {
        if (categoryRepository.existsByCategoryNameAndPairRoomEntity(categoryName, pairRoomEntity)) {
            throw new InvalidCategoryException("중복된 이름의 카테고리가 이미 존재합니다.");
        }
    }

    public CategoryUpdateResponse updateCategoryName(final String accessCode, final CategoryUpdateRequest request) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        validateDuplicated(request.updatedCategoryName(), pairRoomEntity);
        final CategoryEntity category = categoryRepository.fetchByPairRoomAndCategoryId(pairRoomEntity,
                request.categoryId());
        category.updateCategoryName(request.updatedCategoryName());
        return new CategoryUpdateResponse(category.getCategoryName());
    }

    public void deleteCategory(final String accessCode, final Long categoryId) {
        final PairRoomEntity pairRoomEntity = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        if (categoryRepository.existsByIdAndPairRoomEntity(categoryId, pairRoomEntity)) {
            final List<ReferenceLinkEntity> referenceLinks = referenceLinkService.findReferenceLinksEntityByCategory(
                    accessCode, categoryId);
            referenceLinks.forEach(ReferenceLinkEntity::updateCategoryToNull);
            categoryRepository.deleteCategoryByPairRoomEntityAndId(pairRoomEntity, categoryId);
        }
    }
}
