package site.coduo.referencelink.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
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
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));

        return categoryRepository.findAllByPairRoom(pairRoom)
                .stream()
                .map(CategoryReadResponse::from)
                .toList();
    }

    public CategoryCreateResponse createCategory(final String accessCode, final CategoryCreateRequest request) {
        validateDuplicated(request.value());
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        final CategoryEntity saved = categoryRepository.save(
                new CategoryEntity(pairRoom, new Category(request.value())));

        return new CategoryCreateResponse(saved.getId(), saved.getCategoryName());
    }

    private void validateDuplicated(final String value) {
        if (categoryRepository.existsByCategoryName(value)) {
            throw new InvalidCategoryException("중복된 이름의 카테고리가 이미 존재합니다.");
        }
    }

    public CategoryUpdateResponse updateCategoryName(final String accessCode,
                                                     final CategoryUpdateRequest request) {
        validateDuplicated(request.updatedCategoryName());
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        final CategoryEntity category = categoryRepository.fetchByPairRoomAndCategoryName(pairRoom,
                request.previousCategoryName());
        category.updateCategoryName(request.updatedCategoryName());
        return new CategoryUpdateResponse(category.getCategoryName());
    }

    public void deleteCategory(final String accessCode, final String categoryName) {
        if (categoryRepository.existsByCategoryName(categoryName)) {
            final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
            final List<ReferenceLinkEntity> referenceLinks = referenceLinkService.findReferenceLinksEntityByCategory(
                    accessCode, categoryName);
            referenceLinks.forEach(ReferenceLinkEntity::updateCategoryToNull);
            categoryRepository.deleteCategoryByPairRoomAndCategoryName(pairRoom, categoryName);
        }
    }
}
