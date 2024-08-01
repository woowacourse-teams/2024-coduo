package site.coduo.referencelink.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.referencelink.domain.OpenGraph;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "OPEN_GRAPH")
@Entity
public class OpenGraphEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "IMAGE")
    private String image;

    @OneToOne
    @JoinColumn(name = "REFERENCE_LINK_ID", referencedColumnName = "ID")
    private ReferenceLinkEntity referenceLinkEntity;

    public OpenGraphEntity(final OpenGraph openGraph) {
        this.title = openGraph.getTitle();
        this.description = openGraph.getDescription();
        this.image = openGraph.getImage();
    }

    public OpenGraph toDomain() {
        return new OpenGraph(title, description, image);
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final OpenGraphEntity that = (OpenGraphEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
