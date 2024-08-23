package site.coduo.referencelink.service;

import java.util.List;
import java.util.Objects;

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
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        validateDuplicated(request.value(), pairRoom);
        final CategoryEntity saved = categoryRepository.save(
                new CategoryEntity(pairRoom, new Category(request.value())));

        return new CategoryCreateResponse(saved.getId(), saved.getCategoryName());
    }

    private void validateDuplicated(final String categoryName, final PairRoom pairRoom) {
        if (categoryRepository.existsByCategoryNameAndPairRoom(categoryName, pairRoom)) {
            throw new InvalidCategoryException("중복된 이름의 카테고리가 이미 존재합니다.");
        }
    }

    public CategoryUpdateResponse updateCategoryName(final String accessCode,
                                                     final CategoryUpdateRequest request) {
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        validateNotChanged(request);
        validateDuplicated(request.updatedCategoryName(), pairRoom);
        final CategoryEntity category = categoryRepository.fetchByPairRoomAndCategoryName(pairRoom,
                request.previousCategoryName());
        category.updateCategoryName(request.updatedCategoryName());
        return new CategoryUpdateResponse(category.getCategoryName());
    }

    private void validateNotChanged(final CategoryUpdateRequest request) {
        if (Objects.equals(request.previousCategoryName(), request.updatedCategoryName())) {
            throw new InvalidCategoryException("변경하고자 하는 카테고리가 동일합니다.");
        }
    }

    public void deleteCategory(final String accessCode, final String categoryName) {
        final PairRoom pairRoom = pairRoomRepository.fetchByAccessCode(new AccessCode(accessCode));
        if (categoryRepository.existsByCategoryNameAndPairRoom(categoryName, pairRoom)) {
            final List<ReferenceLinkEntity> referenceLinks = referenceLinkService.findReferenceLinksEntityByCategory(
                    accessCode, categoryName);
            referenceLinks.forEach(ReferenceLinkEntity::updateCategoryToNull);
            categoryRepository.deleteCategoryByPairRoomAndCategoryName(pairRoom, categoryName);
        }
    }
}
