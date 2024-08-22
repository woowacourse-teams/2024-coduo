package site.coduo.pairroom.domain;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(value = EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private PairRoomStatus status;

    @Embedded
    private Pair pair;

    @Embedded
    @Column(name = "ACCESS_CODE", nullable = false)
    private AccessCode accessCode;

    public PairRoom(final Pair pair, final PairRoomStatus status, final AccessCode accessCode) {
        this.status = status;
        this.pair = pair;
        this.accessCode = accessCode;
    }

    public PairRoom(final Long id, final PairRoomStatus status, final Pair pair, final AccessCode accessCode) {
        this.id = id;
        this.status = status;
        this.pair = pair;
        this.accessCode = accessCode;
    }

    public void updateStatus(final PairRoomStatus status) {
        this.status = status;
    }

    public String getAccessCodeText() {
        return accessCode.getValue();
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoom pairRoom = (PairRoom) o;
        return Objects.equals(id, pairRoom.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "PairRoom{" +
                "id=" + id +
                ", status=" + status +
                ", pair=" + pair +
                ", accessCode=" + accessCode +
                '}';
    }
}
