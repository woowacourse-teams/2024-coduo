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

    @Embedded
    private Pair pair;

    @Embedded
    @Column(name = "ACCESS_CODE", nullable = false)
    private AccessCode accessCode;

    public PairRoom(final PairName firstPair, final PairName secondPair) {
        this.pair = new Pair(firstPair, secondPair);
        this.accessCode = new AccessCode();
    }

    @Override
    public String toString() {
        return "PairRoom{" +
                "id=" + id +
                ", pair=" + pair +
                ", accessCode=" + accessCode +
                '}';
    }
}
