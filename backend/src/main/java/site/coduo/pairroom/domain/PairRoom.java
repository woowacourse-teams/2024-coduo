package site.coduo.pairroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public PairRoom(final Pair pair, final AccessCode accessCode) {
        this.pair = pair;
        this.accessCode = accessCode;
    }

    public String getAccessCodeText() {
        return accessCode.getValue();
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
