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
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.accesscode.AccessCode;
import site.coduo.referencelink.domain.Category;
import site.coduo.referencelink.domain.ReferenceLink;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "REFERENCE_LINK")
@Entity
public class ReferenceLinkEntity extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "URL", nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = true)
    private CategoryEntity categoryEntity;

    @JoinColumn(name = "PAIR_ROOM_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne
    private PairRoom pairRoom;

    public ReferenceLinkEntity(final ReferenceLink referenceLink, final CategoryEntity categoryEntity,
                               final PairRoom pairRoom) {
        this.url = referenceLink.getUrlText();
        this.categoryEntity = categoryEntity;
        this.pairRoom = pairRoom;
    }

    public ReferenceLinkEntity(final ReferenceLink referenceLink, final PairRoom pairRoom) {
        this.url = referenceLink.getUrlText();
        this.categoryEntity = null;
        this.pairRoom = pairRoom;
    }

    public boolean isSameAccessCode(final AccessCode accessCode) {
        return pairRoom.getAccessCode()
                .equals(accessCode);
    }

    public boolean isSameCategory(final Category category) {
        if (categoryEntity == null) {
            return false;
        }
        return categoryEntity.getCategoryName()
                .equals(category.getValue());
    }

    public void updateCategoryToNull() {
        categoryEntity = null;
    }

    public String getCategoryName() {
        if (categoryEntity == null) {
            return null;
        }
        return categoryEntity.getCategoryName();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ReferenceLinkEntity that = (ReferenceLinkEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
