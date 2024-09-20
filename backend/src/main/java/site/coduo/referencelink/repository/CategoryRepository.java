package site.coduo.referencelink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.referencelink.exception.CategoryNotFoundException;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByPairRoomEntityAndCategoryName(PairRoomEntity pairRoomEntity, String categoryName);

    default CategoryEntity fetchByPairRoomAndCategoryName(PairRoomEntity pairRoomEntity, String categoryName) {
        return findByPairRoomEntityAndCategoryName(pairRoomEntity, categoryName)
                .orElseThrow(() -> new CategoryNotFoundException("존재하지 않은 카테고리입니다."));
    }

    List<CategoryEntity> findAllByPairRoomEntity(PairRoomEntity pairRoomEntity);

    boolean existsByCategoryNameAndPairRoomEntity(String categoryName, PairRoomEntity pairRoomEntity);

    void deleteCategoryByPairRoomEntityAndCategoryName(PairRoomEntity pairRoomEntity, String categoryName);
}
