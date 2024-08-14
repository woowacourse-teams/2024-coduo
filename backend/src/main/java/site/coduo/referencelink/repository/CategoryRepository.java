package site.coduo.referencelink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.referencelink.exception.CategoryNotFoundException;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByPairRoomAndCategoryName(PairRoom pairRoom, String categoryName);

    default CategoryEntity fetchByPairRoomAndCategoryName(PairRoom pairRoom, String categoryName) {
        return findByPairRoomAndCategoryName(pairRoom, categoryName)
                .orElseThrow(() -> new CategoryNotFoundException("존재하지 않은 카테고리입니다."));
    }

    List<CategoryEntity> findAllByPairRoom(PairRoom pairRoom);

    boolean existsByCategoryName(String categoryName);

    void deleteCategoryByPairRoomAndCategoryName(PairRoom pairRoom, String categoryName);
}
