package site.coduo.pairroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;

@NoArgsConstructor
@Getter
@Entity
public class PairRoom extends BaseTimeEntity {

    public static final int ACCESS_CODE_LENGTH = 6;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pair1_name", nullable = false)
    private String pairAName;

    @Column(name = "pair2_name", nullable = false)
    private String pairBName;

    @Column(nullable = false)
    private String accessCode;

    public PairRoom(final String pairAName, final String pairBName, final String accessCode) {
        this.pairAName = pairAName;
        this.pairBName = pairBName;
        this.accessCode = accessCode;
    }

    @Override
    public String toString() {
        return "PairRoom{" +
               "id=" + id +
               ", pairAName='" + pairAName + '\'' +
               ", pairBName='" + pairBName + '\'' +
               ", accessCode='" + accessCode + '\'' +
               '}';
    }
}
