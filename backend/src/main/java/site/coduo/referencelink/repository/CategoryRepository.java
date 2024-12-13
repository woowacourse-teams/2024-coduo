package site.coduo.referencelink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.referencelink.exception.CategoryNotFoundException;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByPairRoomEntityAndId(PairRoomEntity pairRoomEntity, Long id);

    default CategoryEntity fetchByPairRoomAndCategoryId(PairRoomEntity pairRoomEntity, Long id) {
        return findByPairRoomEntityAndId(pairRoomEntity, id)
                .orElseThrow(() -> new CategoryNotFoundException("존재하지 않은 카테고리입니다."));
    }

    List<CategoryEntity> findAllByPairRoomEntity(PairRoomEntity pairRoomEntity);

    boolean existsByCategoryNameAndPairRoomEntity(String categoryName, PairRoomEntity pairRoomEntity);

    boolean existsByIdAndPairRoomEntity(Long id, PairRoomEntity pairRoomEntity);

    void deleteCategoryByPairRoomEntityAndId(PairRoomEntity pairRoomEntity, Long id);
}
