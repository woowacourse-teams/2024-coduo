package site.coduo.pairroom.repository;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.coduo.common.infrastructure.audit.entity.BaseTimeEntity;
import site.coduo.pairroom.domain.Pair;
import site.coduo.pairroom.domain.PairName;
import site.coduo.pairroom.domain.PairRoom;
import site.coduo.pairroom.domain.PairRoomStatus;
import site.coduo.pairroom.domain.accesscode.AccessCode;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "PAIR_ROOM")
@Entity
public class PairRoomEntity extends BaseTimeEntity {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    private PairRoomStatus status;

    @Column(name = "NAVIGATOR", nullable = false)
    private String navigator;

    @Column(name = "DRIVER", nullable = false)
    private String driver;

    @Column(name = "ACCESS_CODE", nullable = false, unique = true)
    private String accessCode;

    @Builder
    private PairRoomEntity(final Long id, final PairRoomStatus status, final String navigator, final String driver,
                           final String accessCode) {
        this.id = id;
        this.status = status;
        this.navigator = navigator;
        this.driver = driver;
        this.accessCode = accessCode;
    }

    public static PairRoomEntity from(final PairRoom pairRoom) {
        return new PairRoomEntity(
                null,
                pairRoom.getStatus(),
                pairRoom.getNavigatorName(),
                pairRoom.getDriverName(),
                pairRoom.getAccessCodeText()
        );
    }

    public PairRoom toDomain() {
        return new PairRoom(
                new Pair(new PairName(navigator), new PairName(driver)),
                status,
                new AccessCode(accessCode)
        );
    }

    public void updateStatus(final PairRoomStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PairRoomEntity that = (PairRoomEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
