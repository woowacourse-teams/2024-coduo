package site.coduo.pairroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;

@Getter
@NoArgsConstructor
@Entity
public class PairRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "PAIR1_NAME", nullable = false)
    private String pairAName;

    @Column(name = "PAIR2_NAME", nullable = false)
    private String pairBName;

    @Embedded
    @Column(name = "ACCESS_CODE", nullable = false)
    private AccessCode accessCode;

    public PairRoom(final String pairAName, final String pairBName) {
        this.pairAName = pairAName;
        this.pairBName = pairBName;
        this.accessCode = new AccessCode();
    }

    @Override
    public String toString() {
        return "PairRoom{" +
               "id=" + id +
               ", nameA='" + pairAName + '\'' +
               ", nameB='" + pairBName + '\'' +
               ", accessCode='" + accessCode + '\'' +
               '}';
    }
}
