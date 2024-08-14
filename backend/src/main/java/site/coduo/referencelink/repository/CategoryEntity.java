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
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.referencelink.domain.Category;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "CATEGORY")
@Entity
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CATEGORY_NAME")
    private String categoryName;

    @ManyToOne
    @JoinColumn(name = "PAIR_ROOM", nullable = false)
    private PairRoom pairRoom;

    public CategoryEntity(final PairRoom pairRoom, final Category category) {
        this.pairRoom = pairRoom;
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
}
