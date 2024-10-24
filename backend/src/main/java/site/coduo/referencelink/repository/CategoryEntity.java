package site.coduo.referencelink.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.repository.PairRoomEntity;
import site.coduo.referencelink.domain.Category;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "CATEGORY")
@Entity
public class CategoryEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CATEGORY_NAME")
    private String categoryName;

    @ManyToOne
    @JoinColumn(name = "PAIR_ROOM_ID", referencedColumnName = "ID", nullable = false)
    private PairRoomEntity pairRoomEntity;

    public CategoryEntity(final PairRoomEntity pairRoomEntity, final Category category) {
        this.pairRoomEntity = pairRoomEntity;
        this.categoryName = category.getValue();
    }

    public void updateCategoryName(final String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final CategoryEntity that = (CategoryEntity) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoryEntity{" +
               "id=" + id +
               ", categoryId='" + categoryName + '\'' +
               ", pairRoom=" + pairRoomEntity +
               '}';
    }
}
