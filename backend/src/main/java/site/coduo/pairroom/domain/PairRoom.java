package site.coduo.pairroom.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PAIR_ROOM")
@Entity
public class PairRoom extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Pair pair;

    @Embedded
    @Column(name = "ACCESS_CODE", nullable = false)
    private AccessCode accessCode;

    @Column(name = "TIMER_DURATION", nullable = true)
    private Long timerDuration;

    public PairRoom(final Pair pair, final AccessCode accessCode) {
        this.pair = pair;
        this.accessCode = accessCode;
    }

    public PairRoom(final Long id, final Pair pair, final AccessCode accessCode) {
        this.id = id;
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
                ", timerDuration=" + timerDuration +
                '}';
    }
}
