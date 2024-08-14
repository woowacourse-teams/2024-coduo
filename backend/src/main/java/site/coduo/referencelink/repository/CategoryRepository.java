package site.coduo.referencelink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.coduo.pairroom.domain.PairRoom;
import site.coduo.referencelink.exception.CategoryNotFoundException;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findById(Long id);

    default CategoryEntity fetchById(Long id) {
        return findById(id).orElseThrow(() -> new CategoryNotFoundException("존재하지 않은 카테고리입니다."));
    }

    List<CategoryEntity> findAllByPairRoom(PairRoom pairRoom);
}
