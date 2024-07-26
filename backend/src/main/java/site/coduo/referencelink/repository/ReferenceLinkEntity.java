package site.coduo.referencelink.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.AccessCode;
import site.coduo.pairroom.domain.PairRoom;
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

    @JoinColumn(name = "PAIR_ROOM_ID", referencedColumnName = "ID")
    @ManyToOne
    private PairRoom pairRoom;

    public ReferenceLinkEntity(final ReferenceLink referenceLink, final PairRoom pairRoom) {
        this.url = referenceLink.getUrl();
        this.pairRoom = pairRoom;
    }

    public boolean isSameAccessCode(AccessCode accessCode) {
        return pairRoom.getAccessCode()
                .equals(accessCode);
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReferenceLinkEntity that = (ReferenceLinkEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
